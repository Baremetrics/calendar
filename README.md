# [Baremetrics](https://baremetrics.com/) Date Range Picker
_[Baremetrics](https://baremetrics.com) provides one-click analytics & insights for Stripe. **[Get started today!](https://baremetrics.com)**_

---

The Baremetrics date range picker is a simplified solution for selecting both date ranges and single dates all from a single calender view. There aren't a billion options but the code is pretty basic and modular so feel free to edit however to meet your own needs.

Design by [Chris Meeks](https://dribbble.com/ChrisMeeks)  
Code by [Tyler van der Hoeven](https://github.com/tyvdh)

[View a demo](http://baremetrics.github.io/calendar/)  
[View in a live production app](https://demo.baremetrics.com/)

![](http://tyler.link/bqs5/Screen%20Shot%202015-07-02%20at%201.29.07%20PM.png)
![](http://tyler.link/br0F/Screen%20Shot%202015-07-02%20at%201.29.28%20PM.png)
![](http://tyler.link/bqV5/Screen%20Shot%202015-07-02%20at%201.32.15%20PM.png)

## Installing

Using the date picker is pretty simple, you've just got to make a couple choices and include a couple settings.
Create a div with a `daterange` class and then either the `daterange--double` or `daterange--single` classname for targeting the specific calendar you'd like to generate.

```html
<div class="daterange daterange--double"></div>
<div class="daterange daterange--single"></div>
```

Next you've just gotta create a `new Calendar` instance.

```js
new Calendar({
  element: $('.daterange--single'),
  current_date: 'June 15, 2015'
});

new Calendar({
  element: $('.daterange--double'),
  earliest_date: 'January 1, 2000',
  latest_date: new Date(),
  start_date: 'May 1, 2015',
  end_date: 'May 31, 2015',
  callback: function() {
    var start = moment(this.start_date).format('ll'),
        end = moment(this.end_date).format('ll');
    
    console.debug('Start Date: '+ start +'\nEnd Date: '+ end);
  }
});
```

### Base Calendar Params
- element _\*required_
  - jQuery DOM object of the calendar div you're working on
- earliest_date
  - The earliest date to show in the calendar
- latest_date
  - The latest date to show in the calendar
- callback
  - A function for whenever a new date is saved
  - Inside you have access to variables like `this.earliest_date`, `this.latest_date` and `this.current_date` for doing things with the new dates
- format 
  - Object containing formatting strings for.. you guessed it.. formating your dates
  ```js
    format: {
      input: 'MMMM D, YYYY', // Format for the input fields
      jump_month: 'MMMM', // Format for the month switcher
      jump_year: 'YYYY' // Format for the year switcher
    }
  ```
- days_array
  - Array of the 7 strings you'd like to represent your days in the calendar
  ```js
    days_array: ['Su','Mo','Tu','We','Th','Fr','Sa']
  ```

### Single Calendar Params
- current_date
  - The date to start the calendar on

### Double Calendar Params
- callback
  - The double calendar includes access to `this.end_date` and `this.start_date`
- start_date
  - The date to start the selection on for the calendar
- end_date
  - The date to end the selection on for the calendar
- format
  - The double calendar adds the `preset` key to the format object for formatting the preset dates in the preset dropdown
- same_day_range
  - Allow a range selection of a single day

---

## Developing

I've included my signature gulpfile too so be sure and take a look at that as well.

```bash
$ cd <project directory>
$ npm install
$ gulp
```

I also use [pow](http://pow.cx/) and the [powder gem](https://github.com/Rodreegez/powder) to run my local dev environments but however you plan on wrangling that the gulpfile turns on a livereload server so as long as you have the files serving somehow any changes you make will show up instantly.

## Dependencies
- [jQuery](https://jquery.com/)
- [MomentJS](http://momentjs.com/)
