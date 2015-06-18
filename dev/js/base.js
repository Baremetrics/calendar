function Calendar() {
  this.calIsOpen = false;
  this.presetIsOpen = false;

  var self = this;

  $('.dr-presets').click(function() {
    self.presetToggle();
  });

  $('.dr-date').click(function() {
    self.calendarOpen(this);
  });
}


Calendar.prototype.presetToggle = function() {
  if (this.calIsOpen == true)
    this.calendarClose();

  $('.dr-preset-list').slideToggle(200);
  $('.dr-input').toggleClass('active');
  $('.dr-presets').toggleClass('active');

  if (this.presetIsOpen == false) {
    this.presetIsOpen = true;
  } else if (this.presetIsOpen == true) {
    this.presetIsOpen = false;
  }
}


Calendar.prototype.calendarOpen = function(element) {
  var cal_width = $('.dr-dates').innerWidth() - 8;

  if (this.presetIsOpen == true)
    this.presetToggle();

  if ($(element).hasClass('active'))
    return false;

  if (this.calIsOpen == true)
    this.calendarClose();

  $('.dr-calendar')
    .css('width', cal_width)
    .slideDown(200);
  $('.dr-input').addClass('active');
  $(element).addClass('active');

  this.calIsOpen = true;
}


Calendar.prototype.calendarClose = function() {
  $('.dr-calendar').slideUp(200);
  $('.dr-input').removeClass('active');
  $('.dr-date').removeClass('active');

  this.calIsOpen = false;
}


var cal = new Calendar();