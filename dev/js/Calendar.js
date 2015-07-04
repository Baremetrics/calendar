function Calendar(settings) {
  var self = this;

  this.calIsOpen =    false;
  this.presetIsOpen = false;
  this.element =      settings.element || $('.daterange');
  this.type =         this.element.hasClass('daterange--single') ? 'single' : 'double';
  this.selected =     null;
  this.earliest =     (settings.earliestDate || settings.earliest_date) || new Date('January 1, 1900');
  this.latest =       (settings.latestDate || settings.latest_date) || new Date('December 31, 2900');
  this.endDate =      (settings.endDate || settings.end_date) || (this.type == 'double' ? new Date() : null);
  this.startDate =    (settings.startDate || settings.start_date) || (this.type == 'double' ? new Date(moment(this.endDate).subtract(1, 'month')) : null);
  this.currentDate =  (settings.currentDate || settings.current_date) || (this.type == 'single' ? new Date() : null);
  this.callback =     settings.callback || this.calendarSetDates;

  this.calendarHTML(this.type);

  $('.dr-presets', this.element).click(function() {
    self.presetToggle();
  });

  $('.dr-list-item', this.element).click(function() {
    var range = $('.dr-item-aside', this).html().split('–');

    self.startDate = new Date(range[0]);
    self.endDate = new Date(range[1]);
    self.calendarSetDates();
    self.presetToggle();
    self.calendarSaveDates();
  });

  $('.dr-date', this.element).on({
    'click': function() {
      self.calendarOpen(this);
    },

    'keyup': function(event) {
      if (event.keyCode == 9 && !self.calIsOpen && !self.startDate && !self.endDate)
        self.calendarOpen(this);
    },

    'keydown': function(event) {
      if (event.keyCode == 13) { // Enter
        event.preventDefault();
        self.calendarCheckDates();
        self.calendarSetDates();
        self.calendarSaveDates();
        self.calendarClose('force');
      }

      if (event.keyCode == 27) { // ESC
        self.calendarSetDates();
        self.calendarClose('force');
      }

      if (event.keyCode == 9) { // Tab
        if ($(self.selected).hasClass('dr-date-start')) {
          event.preventDefault();
          $('.dr-date-end', self.element).trigger('click');
        } else {
          self.calendarCheckDates();
          self.calendarSaveDates();
          self.calendarClose('force');
        }
      }
    }
  });

  $('.dr-month-switcher i', this.element).click(function() {
    var m = $('.dr-month-switcher span', self.element).html();
    var y = $('.dr-year-switcher span', self.element).html();
    var back = moment(new Date(m +' 1, '+ y)).subtract(1, 'month');
    var forward = moment(new Date(m +' 1, '+ y)).add(1, 'month').startOf('day');

    if ($(this).hasClass('dr-left')) {  
      $(this).parent().find('span').html(back.format('MMMM'));
      self.calendarOpen(self.selected, back);
    } else if ($(this).hasClass('dr-right')) {
      $(this).parent().find('span').html(forward.format('MMMM'));
      self.calendarOpen(self.selected, forward);
    }
  });

  $('.dr-year-switcher i', this.element).click(function() {
    var m = $('.dr-month-switcher span', self.element).html();
    var y = $('.dr-year-switcher span', self.element).html();
    var back = moment(new Date(m +' 1, '+ y)).subtract(1, 'year');
    var forward = moment(new Date(m +' 1, '+ y)).add(1, 'year').startOf('day');

    if ($(this).hasClass('dr-left')) {  
      $(this).parent().find('span').html(back.format('YYYY'));
      self.calendarOpen(self.selected, back);
    } else if ($(this).hasClass('dr-right')) {
      $(this).parent().find('span').html(forward.format('YYYY'));
      self.calendarOpen(self.selected, forward);
    }
  });

  $('.dr-dates-dash', this.element).click(function() {
    $('.dr-date-start', self.element).trigger('click');
  });

  $(this.element).click(function(event) {
    $('html').one('click',function() {
      if (self.presetIsOpen)
        self.presetToggle();

      if (self.calIsOpen) {
        self.calendarSetDates();
        self.calendarClose('force');
      }
    });

    event.stopPropagation();
  });

  $(this.element).add('.dr-date', this.element).focus(function(event) {
    $('html').one('click',function() {
      if (self.calIsOpen) {
        self.calendarSetDates();
        self.calendarClose('force');
      }
    });

    event.stopPropagation();
  });
}


Calendar.prototype.presetToggle = function() {
  if (this.presetIsOpen == false) {
    this.presetIsOpen = true;
    this.presetCreate();
  } else if (this.presetIsOpen) {
    this.presetIsOpen = false;
  }

  if (this.calIsOpen == true)
    this.calendarClose();

  $('.dr-preset-list', this.element).slideToggle(200);
  $('.dr-input', this.element).toggleClass('active');
  $('.dr-presets', this.element).toggleClass('active');
}


Calendar.prototype.presetCreate = function() {
  var self = this;
  var date = this.latest;

  var s = new Date($('.dr-date-start', self.element).html());
  var e = new Date($('.dr-date-end', self.element).html());
  this.startDate = s == 'Invalid Date' ? this.startDate : s;
  this.endDate = e == 'Invalid Date' ? this.endDate : e;

  $('.dr-list-item', this.element).each(function() {
    var monthCount = $(this).data('months');
    var lastDay = moment(date).endOf('month').startOf('day');
    var isLastDay = lastDay.isSame(date);
    var firstDay;

    if (!isLastDay)
      lastDay = moment(date).subtract(1, 'month').endOf('month').startOf('day');

    if (typeof monthCount == 'number') {
      firstDay = moment(date).subtract(isLastDay ? monthCount - 1 : monthCount, 'month').startOf('month');

      if (monthCount == 12)
        firstDay = moment(date).subtract(isLastDay ? 12 : 13, 'month').endOf('month').startOf('day');
    } else if (monthCount == 'all') {
      firstDay = moment(self.earliest);
      lastDay = moment(self.latest);
    } else {
      firstDay = moment(self.latest).subtract(30, 'day');
      lastDay = moment(self.latest);
    }

    $('.dr-item-aside', this).html(firstDay.format('ll') +' – '+ lastDay.format('ll'));
  });
}


Calendar.prototype.calendarSetDates = function() {
  $('.dr-date-start', this.element).html(moment(this.startDate).format('MMMM D, YYYY'));
  $('.dr-date-end', this.element).html(moment(this.endDate).format('MMMM D, YYYY'));

  if (!this.startDate && !this.endDate) {
    var oldDate = $('.dr-date', this.element).html();
    var newDate = moment(this.currentDate).format('MMMM D, YYYY');

    if (oldDate != newDate)
      $('.dr-date', this.element).html(newDate);
  }
}


Calendar.prototype.calendarSaveDates = function() {
  return this.callback();
}


Calendar.prototype.calendarCheckDates = function() {
  var regex = /(?!<=\d)(st|nd|rd|th)/;
  var s = $('.dr-date-start', this.element).html();
  var e = $('.dr-date-end', this.element).html();
  var c = $(this.selected).html();
  var sArray = [];
  var eArray = [];
  var cArray = [];

  if (s) {
    s = s.replace(regex, '');
    sArray = s.split(' ');
  }

  if (e) {
    e = e.replace(regex, '');
    eArray = e.split(' ');
  }

  if (c) {
    c = c.replace(regex, '');
    cArray = c.split(' ');
  }

  if (sArray.length == 2) {
    sArray.push(moment().format('YYYY'))
    s = sArray.join(' ');
  }

  if (eArray.length == 2) {
    eArray.push(moment().format('YYYY'))
    e = eArray.join(' ');
  }

  if (cArray.length == 2) {
    cArray.push(moment().format('YYYY'))
    c = cArray.join(' ');
  }

  s = new Date(s);
  e = new Date(e);
  c = new Date(c);

  if (moment(s).isAfter(e) || 
      moment(e).isBefore(s) || 
      moment(s).isSame(e) ||
      moment(s).isBefore(this.earliest) ||
      moment(e).isAfter(this.latest)) {
    return this.calendarSetDates();
  }

  this.startDate = s == 'Invalid Date' ? this.startDate : s;
  this.endDate = e == 'Invalid Date' ? this.endDate : e;
  this.currentDate = c == 'Invalid Date' ? this.currentDate : c;
}


Calendar.prototype.calendarOpen = function(selected, switcher) {
  var self = this;
  var other;
  var calWidth = $('.dr-dates', this.element).innerWidth() - 8;

  this.selected = selected || this.selected;

  if (this.presetIsOpen == true)
    this.presetToggle();

  if (this.calIsOpen == true)
    this.calendarClose(switcher ? 'switcher' : undefined);

  this.calendarCheckDates();
  this.calendarCreate(switcher);
  this.calendarSetDates();

  var nextMonth = moment(switcher || this.currentDate).add(1, 'month').startOf('month').startOf('day');
  var pastMonth = moment(switcher || this.currentDate).subtract(1, 'month').endOf('month');
  var nextYear = moment(switcher || this.currentDate).add(1, 'year').startOf('month').startOf('day');
  var pastYear = moment(switcher || this.currentDate).subtract(1, 'year').endOf('month');

  $('.dr-month-switcher span', this.element).html(moment(switcher || this.currentDate).format('MMMM'));
  $('.dr-year-switcher span', this.element).html(moment(switcher || this.currentDate).format('YYYY'));

  $('.dr-switcher i', this.element).removeClass('dr-disabled');

  if (nextMonth.isAfter(this.latest))
    $('.dr-month-switcher .dr-right', this.element).addClass('dr-disabled');

  if (pastMonth.isBefore(this.earliest))
    $('.dr-month-switcher .dr-left', this.element).addClass('dr-disabled');

  if (nextYear.isAfter(this.latest))
    $('.dr-year-switcher .dr-right', this.element).addClass('dr-disabled');

  if (pastYear.isBefore(this.earliest))
    $('.dr-year-switcher .dr-left', this.element).addClass('dr-disabled');

  $('.dr-day', this.element).on({
    mouseenter: function() {
      var selected = $(this);
      var startDate = moment(self.startDate);
      var endDate = moment(self.endDate);
      var currentDate = moment(self.currentDate);

      if (startDate.isSame(currentDate)) {
        selected.addClass('dr-hover dr-hover-before');
        $('.dr-start', self.element).css({'border': 'none', 'padding-left': '0.3125rem'});
        setMaybeRange('start');
      }

      if (endDate.isSame(currentDate)) {
        selected.addClass('dr-hover dr-hover-after');
        $('.dr-end', self.element).css({'border': 'none', 'padding-right': '0.3125rem'});
        setMaybeRange('end');
      }

      if (!self.startDate && !self.endDate)
        selected.addClass('dr-maybe');

      $('.dr-selected', self.element).css('background-color', 'transparent');

      function setMaybeRange(type) {
        other = undefined;

        $.each(_.range(6 * 7), function(i) {
          var next = selected.next().data('date');
          var prev = selected.prev().data('date');
          var curr = selected.data('date');

          if (!curr)
            return false;

          if (!prev)
            prev = curr;

          if (!next)
            next = curr;

          if (type == 'start')
            if (moment(next).isSame(self.endDate))
              return false;

          if (type == 'end')
            if (moment(prev).isSame(self.startDate))
              return false;


          if (type == 'start') {
            if (moment(curr).isAfter(self.endDate)) {
              other = other || moment(curr).add(6, 'day').startOf('day');

              if (i > 5 || (next ? moment(next).isAfter(self.latest) : false)) {
                $(selected).addClass('dr-end');
                other = moment(curr);
                return false;
              }
            }
          }

          if (type == 'end') {
            if (moment(curr).isBefore(self.startDate)) {
              other = other || moment(curr).subtract(6, 'day');

              if (i > 5 || (prev ? moment(prev).isBefore(self.earliest) : false)) {
                $(selected).addClass('dr-start');
                other = moment(curr);
                return false;
              }
            }
          } 


          if (type == 'start')
            selected = selected.next().addClass('dr-maybe');

          if (type == 'end')
            selected = selected.prev().addClass('dr-maybe');
        });
      }
    },
    mouseleave: function() {
      if ($(this).hasClass('dr-hover-before dr-end'))
        $(this).removeClass('dr-end');

      if ($(this).hasClass('dr-hover-after dr-start'))
        $(this).removeClass('dr-start');

      $(this).removeClass('dr-hover dr-hover-before dr-hover-after');
      $('.dr-start, .dr-end', self.element).css({'border': '', 'padding': ''});
      $('.dr-maybe:not(.dr-current)', self.element).removeClass('dr-start dr-end');
      $('.dr-day', self.element).removeClass('dr-maybe');
      $('.dr-selected', self.element).css('background-color', '');
    },
    mousedown: function() {
      var date = $(this).data('date');
      var string = moment(date).format('MMMM D, YYYY');

      if (other) {
        $('.dr-date', self.element)
          .not(self.selected)
          .html(other.format('MMMM D, YYYY'));
      }

      $(self.selected).html(string);
      self.calendarOpen(self.selected);

      if ($(self.selected).hasClass('dr-date-start')) {
        $('.dr-date-end', self.element).trigger('click');
      } else {
        self.calendarSaveDates();
        self.calendarClose('force');
      }
    }
  });

  $('.dr-calendar', this.element)
    .css('width', calWidth)
    .slideDown(200);
  $('.dr-input', this.element).addClass('active');
  $(selected).addClass('active').focus();

  this.calIsOpen = true;
}


Calendar.prototype.calendarClose = function(type) {
  var self = this;

  if (!this.calIsOpen || this.presetIsOpen || type == 'force') {
    $('.dr-date', this.element).blur();
    $('.dr-calendar', this.element).slideUp(200, function() {
      $('.dr-day', self.element).remove();
    });
  } else {
    $('.dr-day', this.element).remove();
  }

  if (type == 'switcher') {
    return false;
  }

  $('.dr-input, .dr-date', this.element).removeClass('active');

  this.calIsOpen = false;
}


Calendar.prototype.calendarArray = function(start, end, current, switcher) {
  var self = this;
  var current = current || start || end;

  var firstDay = moment(switcher || current).startOf('month');
  var lastDay = moment(switcher || current).endOf('month');

  var currentMonth = {
    start: {
      day: +firstDay.format('d'), 
      str: +firstDay.format('D')
    }, 
    end: {
      day: +lastDay.format('d'), 
      str: +lastDay.format('D')
    }
  }


  // Beginning faded dates
  var d = undefined;

  var startHidden = _.map(_.range(currentMonth.start.day), function() {
    if (d == undefined) {
      d = moment(firstDay);
    } d = d.subtract(1, 'day');

    return {
      str: +d.format('D'),
      start: d.isSame(start),
      end: d.isSame(end),
      current: d.isSame(current),
      selected: d.isBetween(start, end),
      date: d.toISOString(),
      outside: d.isBefore(self.earliest),
      fade: true
    }
  }).reverse();


  // Leftover faded dates
  var leftover = (6 * 7) - (currentMonth.end.str + startHidden.length);
  d = undefined;

  var endHidden = _.map(_.range(leftover), function() {
    if (d == undefined) {
      d = moment(lastDay);
    } d = d.add(1, 'day').startOf('day');

    return {
      str: +d.format('D'),
      start: d.isSame(start),
      end: d.isSame(end),
      current: d.isSame(current),
      selected: d.isBetween(start, end),
      date: d.toISOString(),
      outside: d.isAfter(self.latest),
      fade: true
    }
  });


  // Actual visible dates
  d = undefined;

  var visible = _.map(_.range(currentMonth.end.str), function() {
    if (d == undefined) {
      d = moment(firstDay);
    } else {
      d = d.add(1, 'day').startOf('day');
    }

    return {
      str: +d.format('D'),
      start: d.isSame(start),
      end: d.isSame(end),
      current: d.isSame(current),
      selected: d.isBetween(start, end),
      date: d.toISOString(),
      outside: d.isBefore(self.earliest) || d.isAfter(self.latest)
    }
  });


  return startHidden.concat(visible, endHidden);
}


Calendar.prototype.calendarCreate = function(switcher) {
  var self = this;
  var array = this.calendarArray(this.startDate, this.endDate, this.currentDate, switcher);

  _.each(array, function(d, i) {
    var classString = "dr-day";

    if (d.fade)
      classString += " dr-fade";

    if (d.start)
      classString += " dr-start";

    if (d.end)
      classString += " dr-end";

    if (d.current)
      classString += " dr-current";
    
    if (d.selected)
      classString += " dr-selected";

    if (d.outside)
      classString += " dr-outside";

    $('.dr-day-list', self.element).append('<li class="'+ classString +'" data-date="'+ d.date +'">'+ d.str +'</li>');
  });
}


Calendar.prototype.calendarHTML = function(type) {
  if (type == "double")
    return this.element.append('<div class="dr-input">' +
      '<div class="dr-dates">' +
        '<div class="dr-date dr-date-start" contenteditable>'+ moment(this.startDate).format('MMMM D, YYYY') +'</div>' +
        '<span class="dr-dates-dash">–</span>' +
        '<div class="dr-date dr-date-end" contenteditable>'+ moment(this.endDate).format('MMMM D, YYYY') +'</div>' +
      '</div>' +

      '<div class="dr-presets">' +
        '<span class="dr-preset-bar"></span>' +
        '<span class="dr-preset-bar"></span>' +
        '<span class="dr-preset-bar"></span>' +
      '</div>' +
    '</div>' +

    '<div class="dr-selections">' +
      '<div class="dr-calendar" style="display: none;">' +
        '<div class="dr-range-switcher">' +
          '<div class="dr-switcher dr-month-switcher">' +
            '<i class="dr-left"></i>' +
            '<span>April</span>' +
            '<i class="dr-right"></i>' +
          '</div>' +
          '<div class="dr-switcher dr-year-switcher">' +
            '<i class="dr-left"></i>' +
            '<span>2015</span>' +
            '<i class="dr-right"></i>' +
          '</div>' +
        '</div>' +
        '<ul class="dr-days-of-week-list">' +
          '<li class="dr-day-of-week">S</li>' +
          '<li class="dr-day-of-week">M</li>' +
          '<li class="dr-day-of-week">T</li>' +
          '<li class="dr-day-of-week">W</li>' +
          '<li class="dr-day-of-week">T</li>' +
          '<li class="dr-day-of-week">F</li>' +
          '<li class="dr-day-of-week">S</li>' +
        '</ul>' +
        '<ul class="dr-day-list"></ul>' +
      '</div>' +

      '<ul class="dr-preset-list" style="display: none;">' +
        '<li class="dr-list-item" data-months="days">Last 30 days <span class="dr-item-aside"></span></li>' +
        '<li class="dr-list-item" data-months="1">Last month <span class="dr-item-aside"></span></li>' +
        '<li class="dr-list-item" data-months="3">Last 3 months <span class="dr-item-aside"></span></li>' +
        '<li class="dr-list-item" data-months="6">Last 6 months <span class="dr-item-aside"></span></li>' +
        '<li class="dr-list-item" data-months="12">Last year <span class="dr-item-aside"></span></li>' +
        '<li class="dr-list-item" data-months="all">All time <span class="dr-item-aside"></span></li>' +
      '</ul>' +
    '</div>');

  return this.element.append('<div class="dr-input">' +
    '<div class="dr-dates">' +
      '<div class="dr-date" contenteditable>'+ moment(this.currentDate).format('MMMM D, YYYY') +'</div>' +
    '</div>' +
  '</div>' +

  '<div class="dr-selections">' +
    '<div class="dr-calendar" style="display: none;">' +
      '<div class="dr-range-switcher">' +
        '<div class="dr-switcher dr-month-switcher">' +
          '<i class="dr-left"></i>' +
          '<span></span>' +
          '<i class="dr-right"></i>' +
        '</div>' +
        '<div class="dr-switcher dr-year-switcher">' +
          '<i class="dr-left"></i>' +
          '<span></span>' +
          '<i class="dr-right"></i>' +
        '</div>' +
      '</div>' +
      '<ul class="dr-days-of-week-list">' +
        '<li class="dr-day-of-week">S</li>' +
        '<li class="dr-day-of-week">M</li>' +
        '<li class="dr-day-of-week">T</li>' +
        '<li class="dr-day-of-week">W</li>' +
        '<li class="dr-day-of-week">T</li>' +
        '<li class="dr-day-of-week">F</li>' +
        '<li class="dr-day-of-week">S</li>' +
      '</ul>' +
      '<ul class="dr-day-list"></ul>' +
    '</div>' +
  '</div>');
}