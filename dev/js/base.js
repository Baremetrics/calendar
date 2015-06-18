function Calendar() {
  this.calIsOpen = false;
  this.presetIsOpen = false;
  this.start_date = null;
  this.end_date = null;
  this.current_date = null;

  var self = this;

  $('.dr-presets').click(function() {
    self.presetToggle();
  });

  $('.dr-date').click(function() {
    self.calendarOpen(this);
  });
}


Calendar.prototype.presetToggle = function() {
  $('.dr-preset-list').slideToggle(200);
  $('.dr-input').toggleClass('active');
  $('.dr-presets').toggleClass('active');

  if (this.presetIsOpen == false) {
    this.presetIsOpen = true;
  } else if (this.presetIsOpen == true) {
    this.presetIsOpen = false;
  }

  if (this.calIsOpen == true)
    this.calendarClose();
}


Calendar.prototype.calendarOpen = function(element) {
  var cal_width = $('.dr-dates').innerWidth() - 8;
  this.start_date = $('.dr-date-start').html();
  this.end_date = $('.dr-date-end').html();
  this.current_date = $(element).html();

  if ($(element).hasClass('active'))
    return false;

  if (this.presetIsOpen == true)
    this.presetToggle();

  if (this.calIsOpen == true)
    this.calendarClose();

  cal.calendarCreate();

  // $('.dr-day').click(function() {

  // });

  $('.dr-calendar')
    .css('width', cal_width)
    .slideDown(200);
  $('.dr-input').addClass('active');
  $(element).addClass('active');

  this.calIsOpen = true;
}


Calendar.prototype.calendarClose = function() {
  if (!this.calIsOpen || this.presetIsOpen)
    $('.dr-calendar').slideUp(200);

  $('.dr-input').removeClass('active');
  $('.dr-date').removeClass('active');
  $('.dr-day').remove();

  this.calIsOpen = false;
}


Calendar.prototype.calendarArray = function(start, end, current) {
  var start = start ? new Date(start) : new Date();
  var end = end ? new Date(end) : moment(start).add(1, 'week');
  var current = current ? new Date(current) : start;

  var first_day = moment(start).startOf('month');
  var last_day = moment(end).endOf('month');

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
      start: d.format('D') == moment(start).format('D'),
      end: d.format('D') == moment(end).format('D'),
      selected: moment(d).isBetween(start, end),
      fade: true
    }
  }).reverse();


  // Leftover faded dates
  var leftover = (6 * 7) - (current_month.end.str + start_hidden.length);
  var d = undefined;

  var end_hidden = _.map(_.range(leftover), function() {
    if (d == undefined) {
      d = moment(last_day);
    } d = d.add(1, 'day');

    return {
      str: +d.format('D'),
      start: d.format('D') == moment(start).format('D'),
      end: d.format('D') == moment(end).format('D'),
      selected: moment(d).isBetween(start, end),
      fade: true
    }
  });


  // Actual visible dates
  var d = undefined;

  var visible = _.map(_.range(current_month.end.str), function() {
    if (d == undefined) {
      d = moment(first_day);
    } else {
      d = d.add(1, 'day');
    }

    return {
      str: +d.format('D'),
      start: d.format('D') == moment(start).format('D'),
      end: d.format('D') == moment(end).format('D'),
      current: d.format('D') == moment(current).format('D'),
      selected: moment(d).isBetween(start, end)
    }
  });


  return start_hidden.concat(visible, end_hidden);
}


Calendar.prototype.calendarCreate = function() {
  var array = this.calendarArray(this.start_date, this.end_date, this.current_date);

  var current_week;

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

    $('.dr-day-list').append('<li class="'+ classString +'">'+ d.str +'</li>');
  });
}


var cal = new Calendar();