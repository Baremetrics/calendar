# [Baremetrics](https://baremetrics.com/) Date Range Picker

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
}
```

### Single Calendar params
- element\*
  - jQuery DOM object of the calendar div you're working on
- callback
  - A function for whenever a new date is saved
  - Inside you have access to variables like `this.earliest`, `this.latest`, `this.endDate` and `this.startDate` for doing things with the new dates.
- earliestDate
  - The earliest date to show in the calendar
- latestDate
  - The latest date to show in the calendar
- currentDate
  - The date to start the calendar on

### Double Calendar params
- element\*
  - jQuery DOM object of the calendar div you're working on
- callback
  - A function for whenever a new date is saved
  - Inside you have access to variables like `this.earliest`, `this.latest`, `this.endDate` and `this.startDate` for doing things with the new dates.
- earliestDate
  - The earliest date to show in the calendar
- latestDate
  - The latest date to show in the calendar
- startDate
  - The date to start the selection on for the calendar
- endDate
  - The date to end the selection on for the calendar

---
\* required

## Developing

I've included my signature gulpfile too so be sure and take a look at that as well.

```bash
$ cd <project directory>
$ npm install
$ gulp
```

I also use [pow](http://pow.cx/) and the [powder gem](https://github.com/Rodreegez/powder) to run my local dev environments but however you plan on wrangling that the gulpfile turns on a livereload server so as long as you have the files serving somehow any changes you make will show up instantly.
