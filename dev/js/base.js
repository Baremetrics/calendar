function Calendar(settings) {
  this.calIsOpen = false;
  this.presetIsOpen = false;
  this.element = null;
  this.earliest = settings.earliest,
  this.latest = settings.latest,
  this.start_date = null;
  this.end_date = null;
  this.current_date = null;

  var self = this;

  $('.dr-presets').click(function() {
    self.presetToggle();
  });

  $('.dr-list-item').click(function() {
    var range = $('.dr-item-aside', this).html().split('–');
    $('.dr-date-start').html(range[0]);
    $('.dr-date-end').html(range[1]);
    self.presetToggle();
  });

  $('.dr-date').click(function() {
    self.calendarOpen(this);
  });

  $('.dr-date').keydown(function(event){
    if (event.keyCode == 13) { // Enter
      event.preventDefault();
      self.calendarOpen(this);
    }
    if (event.keyCode == 27) { // ESC
      self.calendarClose('force');
      self.calendarResetDates();
    }
  });

  $('.dr-month-switcher i').click(function() {
    var m = $('.dr-month-switcher span').html();
    var y = $('.dr-year-switcher span').html();
    var back = moment(new Date(m +', '+ y)).subtract(1, 'month');
    var forward = moment(new Date(m +', '+ y)).add(1, 'month').startOf('day');

    if ($(this).hasClass('icon-left')) {  
      $(this).parent().find('span').html(back.format('MMMM'));
      self.calendarOpen(this.element, back);
    } else if ($(this).hasClass('icon-right')) {
      $(this).parent().find('span').html(forward.format('MMMM'));
      self.calendarOpen(this.element, forward);
    }
  });

  $('.dr-year-switcher i').click(function() {
    var m = $('.dr-month-switcher span').html();
    var y = $('.dr-year-switcher span').html();
    var back = moment(new Date(m +', '+ y)).subtract(1, 'year');
    var forward = moment(new Date(m +', '+ y)).add(1, 'year').startOf('day');

    if ($(this).hasClass('icon-left')) {  
      $(this).parent().find('span').html(back.format('YYYY'));
      self.calendarOpen(this.element, back);
    } else if ($(this).hasClass('icon-right')) {
      $(this).parent().find('span').html(forward.format('YYYY'));
      self.calendarOpen(this.element, forward);
    }
  });

  $('.daterange').click(function(event) {
    $('html').one('click',function() {
      if (self.presetIsOpen)
        self.presetToggle();

      if (self.calIsOpen)
        self.calendarClose('force');
        self.calendarResetDates();
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

  $('.dr-preset-list').slideToggle(200);
  $('.dr-input').toggleClass('active');
  $('.dr-presets').toggleClass('active');
}


Calendar.prototype.presetCreate = function() {
  var self = this;
  var date = this.latest;

  var s = new Date($('.dr-date-start').html());
  var e = new Date($('.dr-date-end').html());
  this.start_date = s == 'Invalid Date' ? this.start_date : s;
  this.end_date = e == 'Invalid Date' ? this.end_date : e;

  $('.dr-list-item').each(function() {
    var month_count = $(this).data('months');
    var last_day = moment(date).endOf('month').startOf('day');
    var is_last_day = last_day.isSame(date);
    var first_day;

    if (!is_last_day)
      last_day = moment(date).subtract(1, 'month').endOf('month').startOf('day');

    if (typeof month_count == 'number') {
      first_day = moment(date).subtract(is_last_day ? month_count - 1 : month_count, 'month').startOf('month');

      if (month_count == 12)
        first_day = moment(date).subtract(is_last_day ? 12 : 13, 'month').endOf('month').startOf('day');
    } else {
      first_day = moment(self.earliest);
      last_day = moment(self.latest);
    }

    $('.dr-item-aside', this).html(first_day.format('ll') +' – '+ last_day.format('ll'));
  });
}


Calendar.prototype.calendarResetDates = function() {
  $('.dr-date-start').html(moment(this.start_date).format('MMMM D, YYYY'));
  $('.dr-date-end').html(moment(this.end_date).format('MMMM D, YYYY'));
}


Calendar.prototype.calendarOpen = function(element, switcher) {
  var self = this;
  var other;
  var cal_width = $('.dr-dates').innerWidth() - 8;
  var s = new Date($('.dr-date-start').html());
  var e = new Date($('.dr-date-end').html());
  var c = new Date($(element).html());

  if (moment(s).isAfter(e) || 
      moment(e).isBefore(s) || 
      moment(s).isSame(e) ||
      moment(s).isBefore(this.earliest) ||
      moment(e).isAfter(this.latest)) {
    return this.calendarResetDates();
  }

  this.element = element || this.element;
  this.start_date = s == 'Invalid Date' ? this.start_date : s;
  this.end_date = e == 'Invalid Date' ? this.end_date : e;
  this.current_date = c == 'Invalid Date' ? this.current_date : c;

  if (this.presetIsOpen == true)
    this.presetToggle();

  if (this.calIsOpen == true)
    this.calendarClose(switcher ? 'switcher' : undefined);

  this.calendarCreate(switcher);

  $('.dr-month-switcher span').html(moment(switcher || this.current_date).format('MMMM'));
  $('.dr-year-switcher span').html(moment(switcher || this.current_date).format('YYYY'));
  $('.dr-switcher i').removeClass('dr-disabled');

  var next_month = moment(switcher || this.current_date).add(1, 'month').startOf('month').startOf('day');
  var past_month = moment(switcher || this.current_date).subtract(1, 'month').endOf('month');
  var next_year = moment(switcher || this.current_date).add(1, 'year').startOf('month').startOf('day');
  var past_year = moment(switcher || this.current_date).subtract(1, 'year').endOf('month');

  if (next_month.isAfter(this.latest))
    $('.dr-month-switcher .icon-right').addClass('dr-disabled');

  if (past_month.isBefore(this.earliest))
    $('.dr-month-switcher .icon-left').addClass('dr-disabled');

  if (next_year.isAfter(this.latest))
    $('.dr-year-switcher .icon-right').addClass('dr-disabled');

  if (past_year.isBefore(this.earliest))
    $('.dr-year-switcher .icon-left').addClass('dr-disabled');

  $('.dr-day').on({
    mouseenter: function() {
      var element = $(this);
      var start_date = moment(self.start_date);
      var end_date = moment(self.end_date);
      var current_date = moment(self.current_date);

      if (start_date.isSame(current_date)) {
        $(this).addClass('hover hover-before');
        $('.dr-start').css({'border': 'none', 'padding-left': '0.3125rem'});
        setMaybeRange('start');
      }

      if (end_date.isSame(current_date)) {
        $(this).addClass('hover hover-after');
        $('.dr-end').css({'border': 'none', 'padding-right': '0.3125rem'});
        setMaybeRange('end');
      }

      $('.dr-selected').css('background-color', 'transparent');

      function setMaybeRange(type) {
        other = undefined;

        $.each(_.range(6 * 7), function(i) {
          var next = element.next().data('date');
          var prev = element.prev().data('date');
          var curr = element.data('date');

          if (!curr)
            return false;

          if (!prev)
            prev = curr;

          if (!next)
            next = curr;

          if (type == 'start')
            if (moment(next).isSame(self.end_date))
              return false;

          if (type == 'end')
            if (moment(prev).isSame(self.start_date))
              return false;


          if (type == 'start') {
            if (moment(curr).isAfter(self.end_date)) {
              other = other || moment(curr).add(6, 'day').startOf('day');

              if (i > 5 || (next ? moment(next).isAfter(self.latest) : false)) {
                $(element).addClass('dr-end');
                other = moment(curr);
                return false;
              }
            }
          }

          if (type == 'end') {
            if (moment(curr).isBefore(self.start_date)) {
              other = other || moment(curr).subtract(6, 'day');

              if (i > 5 || (prev ? moment(prev).isBefore(self.earliest) : false)) {
                $(element).addClass('dr-start');
                other = moment(curr);
                return false;
              }
            }
          } 


          if (type == 'start')
            element = element.next().addClass('dr-maybe');

          if (type == 'end')
            element = element.prev().addClass('dr-maybe');
        });
      }
    },
    mouseleave: function() {
      $(this).removeClass('hover hover-before hover-after');
      $('.dr-start, .dr-end').css({'border': '', 'padding': ''});
      $('.dr-maybe:not(.dr-current)').removeClass('dr-start dr-end');
      $('.dr-day').removeClass('dr-maybe');
      $('.dr-selected').css('background-color', '');
    },
    mousedown: function() {
      var date = $(this).data('date');
      var string = moment(date).format('MMMM D, YYYY');

      if (other) {
        $('.dr-date')
          .not(self.element)
          .html(other.format('MMMM D, YYYY'));
      }

      $(self.element).html(string);
      self.calendarOpen(self.element);

      // if ($(self.element).hasClass('dr-date-start')) {
      //   $('.dr-date-end').trigger('click');
      // } else if ($(self.element).hasClass('dr-date-end')) {
      //   self.calendarClose('force');
      // }
    }
  });

  $('.dr-calendar')
    .css('width', cal_width)
    .slideDown(200);
  $('.dr-input').addClass('active');
  $(element).addClass('active').focus();

  this.calIsOpen = true;
}


Calendar.prototype.calendarClose = function(type) {
  if (!this.calIsOpen || this.presetIsOpen || type == 'force') {
    $('.dr-calendar').slideUp(200, function() {
      $('.dr-day').remove();
    });
  } else {
    $('.dr-day').remove();
  }

  if (type == 'switcher')
    return false;

  $('.dr-input').removeClass('active');
  $('.dr-date').removeClass('active').blur();

  this.calIsOpen = false;
}


Calendar.prototype.calendarArray = function(start, end, current, switcher) {
  var self = this;
  var start = start || new Date();
  var end = end || moment(start).add(1, 'week').startOf('day');
  var current = current || start || end;

  var first_day = moment(switcher || current).startOf('month');
  var last_day = moment(switcher || current).endOf('month');

  var current_month = {
    start: {
      day: +first_day.format('d'), 
      str: +first_day.format('D')
    }, 
    end: {
      day: +last_day.format('d'), 
      str: +last_day.format('D')
    }
  }


  // Beginning faded dates
  var d = undefined;

  var start_hidden = _.map(_.range(current_month.start.day), function() {
    if (d == undefined) {
      d = moment(first_day);
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
  var leftover = (6 * 7) - (current_month.end.str + start_hidden.length);
  d = undefined;

  var end_hidden = _.map(_.range(leftover), function() {
    if (d == undefined) {
      d = moment(last_day);
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

  var visible = _.map(_.range(current_month.end.str), function() {
    if (d == undefined) {
      d = moment(first_day);
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


  return start_hidden.concat(visible, end_hidden);
}


Calendar.prototype.calendarCreate = function(switcher) {
  var array = this.calendarArray(this.start_date, this.end_date, this.current_date, switcher);

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

    $('.dr-day-list').append('<li class="'+ classString +'" data-date="'+ d.date +'">'+ d.str +'</li>');
  });
}


var cal = new Calendar({
  earliest: new Date($('.daterange').data('earliest')),
  latest: new Date($('.daterange').data('latest'))
});