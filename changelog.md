## 1.0.4 Update
- Formats! You can now format all the output dates via the format object in the `new Calendar` call (Thanks [Derk-Jan Karrenbeld](https://github.com/SleeplessByte))
```js
new Calendar({
  ...
  format = {
    input: 'MMMM D, YYYY', // Format for the input fields
    preset: 'll', // Format for the preset dates
    jump_month: 'MMMM', // Format for the month switcher
    jump_year: 'YYYY' // Format for the year switcher
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
- Added support for manual date entry outside the range.. will now clamp back/forward to latest/earliest dates rather then just resetting. Yay!
- On the double calendar, callbacks now submit on a click event outside the calendar if a valid date has been chosen for the first date. No need to pick the same second date just to submit the changes!
- A few more minor bug fixes and improvements

## 1.0.3 Update

- Added basic shorthand keyword support
  - `now` or `today` to set date to today's date
  - `earliest` or `latest` to set date to the preset earliest or latest dates respectively
  - `[number] [interval] [ago/ahead]` to advance or regress the date based off the currently selected date (i.e. `1 month ago` on a date of August 1 would result in a date of July 1)
- You may now use plain date strings in the Calendar object
- Fixed a bug where auto selecting a week range after or before the current selection was getting suppressed and reset to the previous dates
- Added support for selecting a range of single day with the `same_day_range` boolean in the double calendar call
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