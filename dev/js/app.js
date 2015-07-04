new Calendar({
  element: $('.daterange--single'),
  currentDate: new Date('June 15, 2015')
});
  
new Calendar({
  element: $('.daterange--double'),
  earliestDate: new Date('January 1, 2000'),
  latestDate: new Date(),
  startDate: new Date('May 1, 2015'),
  endDate: new Date('May 31, 2015'),
  callback: function() {
    var start = moment(this.startDate).format('ll'),
        end = moment(this.endDate).format('ll');
    
    console.log('Start Date: '+ start +'\nEnd Date: '+ end);
  }
});