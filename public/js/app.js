var ss = new Calendar({
  element: $('.daterange--single'),
  current_date: 'June 15, 2015'
});

var dd = new Calendar({
  element: $('.daterange--double'),
  earliest_date: 'January 1, 2000',
  latest_date: new Date(),
  start_date: 'May 1, 2015',
  end_date: 'May 31, 2015',
  history_options: [
    {
      label   : 'last 20 days',
      days    : '20',
      round   : false
    }, {
      label   : 'last 2 months',
      months  : '2',
      round   : true
    }, {
      label   : 'last 3 months',
      months  : '3',
      round   : true
    }, {
      label   : 'last 6 months',
      months  : '6',
      round   : true
    }, {
      label   : 'last year',
      years   : '1',
      round   : false
    }, {
      label   : 'all time',
      months  : '0',
      round   : true
    }
  ],
  callback: function() {
    var start = moment(this.start_date).format('ll'),
        end = moment(this.end_date).format('ll');

    console.debug('Start Date: '+ start +'\nEnd Date: '+ end);
  }
});