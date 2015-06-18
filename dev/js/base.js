function Calendar() {
  var self = this;

  $('.dr-presets').click(function() {
    self.presetOpen();
  });

  $('.dr-date').click(function() {
    self.calendarOpen();
  });
}

Calendar.prototype.presetOpen = function() {
  $('.dr-preset-list').slideToggle(200);
  $('.dr-input').toggleClass('active');
  $('.dr-presets').toggleClass('active');
}

Calendar.prototype.calendarOpen = function() {

}

var cal = new Calendar();