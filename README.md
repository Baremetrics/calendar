# [Baremetrics](https://baremetrics.com/) Date Range Picker
_[Baremetrics](https://baremetrics.com) provides one-click analytics & insights for Stripe. **[Get started today!](https://baremetrics.com)**_

---

## 1.0.4 Update
- Formats! You can now format all the output dates via the format object in the `new Calendar` call (Thanks [Derk-Jan Karrenbeld](https://github.com/SleeplessByte))
```js
new Calendar({
  ...
  format = {
    'input': 'MMMM D, YYYY', // Format for the input fields
    'preset': 'll', // Format for the preset dates
    'jump_month': 'MMMM', // Format for the month switcher
    'jump_year': 'YYYY' // Format for the year switcher
  }
  ...
  }
});
```
- Days array. You can now include your own days array if you'd like to change the values at the top of the calendar
```js
new Calendar({
  ...
  days_array: ['Su','Mo','Tu','We','Th','Fr','Sa']
  ...
  }
});
```
- On the double calendar, callbacks now submit on a click event outside the calendar if a valid date has been chosen for the first date. No need to pick the same second date just to submit the changes!
- A few more minor bug fixes and improvements

## 1.0.3 Update

- Added basic shorthand keyword support
  - `now` or `today` to set date to today's date
  - `earliest` or `latest` to set date to the preset earliest or latest dates respectively
  - `[number] [interval] [ago/ahead]` to advance or regress the date based off the currently selected date (i.e. `1 month ago` on a date of August 1 would result in a date of July 1)
- You may now use plain date strings in the Calendar object
- Fixed a bug where auto selecting a week range after or before the current selection was getting suppressed and reset to the previous dates
- Cleaned and dried out a couple verbose functions

## 1.0.2 Update

- Added license and repo info to the package.json
- Removed underscore dependency
- Added the github page publisher function to the gulpfile
- Added a switch statement for keycode checking (Thanks again [Theodore Brown](https://github.com/theodorejb))
- Added the `'use strict'` label to the Calendar.js file
- Cleaned out some unused gulp functions
- Compressed the Sass folder to a single level

## 1.0.1 Update

- Removed global CSS reset file
- Fixed issue with presets not respecting earliest date
- Registered the package with Bower `bower install BaremetricsCalendar` (Thanks [Agustin Diaz](https://github.com/HiroAgustin))
- Shifted code base to support UMD support (Thanks [Derrick Reimer](https://github.com/djreimer))
- Added up/down keyboard support
  - day = keystroke up/down
  - week = hold shift + keystroke up/down
  - month = hold meta + keystroke up/down
- Fixed a couple minor typos hither and thither

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

### Single Calendar params
- element\*
  - jQuery DOM object of the calendar div you're working on
- callback
  - A function for whenever a new date is saved
  - Inside you have access to variables like `this.earliest_date`, `this.latest_date` and `this.current_date` for doing things with the new dates.
- earliest_date
  - The earliest date to show in the calendar
- latest_date
  - The latest date to show in the calendar
- current_date
  - The date to start the calendar on

### Double Calendar params
- element\*
  - jQuery DOM object of the calendar div you're working on
- callback
  - A function for whenever a new date is saved
  - Inside you have access to variables like `this.earliest_date`, `this.latest_date`, `this.end_date`, `this.start_date` and `this.current_date` for doing things with the new dates.
- earliest_date
  - The earliest date to show in the calendar
- latest_date
  - The latest date to show in the calendar
- start_date
  - The date to start the selection on for the calendar
- end_date
  - The date to end the selection on for the calendar
- format 
  - Object containing formatting strings for.. you guessed it.. formating your dates
  - ```js
    format: {
      input: 'MMMM D, YYYY', // Format for the input fields
      preset: 'll', // Format for the preset dates
      jump_month: 'MMMM', // Format for the month switcher
      jump_year: 'YYYY' // Format for the year switcher
    }
    ```
- days_array
  - Array of the 7 strings you'd like to represent your days in the calendar
  - ```js
    days_array: ['Su','Mo','Tu','We','Th','Fr','Sa']
    ```
- same_day_range
  - Allow a range selection of a single day

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

## Dependencies
- [jQuery](https://jquery.com/)
- [MomentJS](http://momentjs.com/)
