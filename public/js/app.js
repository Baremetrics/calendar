var ss = new Calendar({
  element: $('.daterange--single'),
  format: {input: 'M/D/YYYY'},
  placeholder: 'Select a Date',
  required: false,
  callback: function() {
    console.log('Single calendar callback triggered');
  }
});

var dd = new Calendar({
  element: $('.one'),
  earliest_date: '2000-01-01',
  latest_date: moment(),
  start_date: moment().subtract(29, 'days'),
  end_date: moment(),
  callback: function() {
    var start = moment(this.start_date).format('ll'),
        end = moment(this.end_date).format('ll');

    console.debug('Start Date: '+ start +'\nEnd Date: '+ end);
  }
});

new Calendar({
  element: $('.two'),
  earliest_date: '2000-01-01',
  latest_date: moment(),
  start_date: moment().subtract(29, 'days'),
  end_date: moment(),
  presets: false,
  callback: function() {
    var start = moment(this.start_date).format('ll'),
        end = moment(this.end_date).format('ll');

    console.debug('Start Date: '+ start +'\nEnd Date: '+ end);
  }
});

new Calendar({
  element: $('.three'),
  earliest_date: '2000-01-01',
  latest_date: moment(),
  start_date: moment().subtract(29, 'days'),
  end_date: moment(),
  presets: [{
    label: 'Last 30 days',
    start: moment().subtract(29, 'days'),
    end: moment()
  },{
    label: 'Last month',
    start: moment().subtract(1, 'month').startOf('month'),
    end: moment().subtract(1, 'month').endOf('month')
  },{
    label: 'Last year',
    start: moment().subtract(12, 'months').startOf('month'),
    end: moment().subtract(1, 'month').endOf('month')
  }],
  callback: function() {
    var start = moment(this.start_date).format('ll'),
        end = moment(this.end_date).format('ll');

    console.debug('Start Date: '+ start +'\nEnd Date: '+ end);
  }
});
