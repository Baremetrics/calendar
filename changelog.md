## 1.0.10 Update
- Better iOS support. The date inputs are no longer editable. Having a keyboard popup for editing dates was a lot slower then just tapping stuff. So we cut it. Thanks [azaytsev-csr](https://github.com/azaytsev-csr)!
- Minor tweaks and outlier bug fixes Thanks [Paul Ryan](https://github.com/paullryan)!
- More consistent moment usage. Cleaned up the code base quite a bit. Thanks [Theodore Brown](https://github.com/theodorejb)!
- Fire callback on single calendar when value is deleted [](https://github.com/Baremetrics/calendar/issues/68)

## 1.0.9 Update
- Don't automatically include the "This month" preset in with custom presets (sorry guys)
- If required is set to `false` for a date range but you've included a `current_date` value the input will pre-fill with that date rather then defaulting to the placeholder

## 1.0.8 Update
- Pulled in a couple pull requests to fix some locale issues
- Couple small bug fixes and performance improvements

## 1.0.7 Update
Originally the compiled CSS file had both my demo app CSS and the calendar CSS all mashed together. Apparently some folks found that to be annoying. (Hint: It was me) This is no longer the case.

## 1.0.6 Update
Custom presets!!

- **presets** `[boolean] or [object]`
  - If you don't want to show the preset link just set this to `false` otherwise the default is true which will just give you a basic preset of.. yep.. presets. BOOM!
  - Otherwise, if you want to customize it up you can include an array of preset objects. Something like:
  ```js
    presets: [{
      label: 'Last month',
      start: moment().subtract(1, 'month').startOf('month'),
      end: moment().subtract(1, 'month').endOf('month')
    },{
      label: 'Last year',
      start: moment().subtract(12, 'months').startOf('month'),
      end: moment().subtract(1, 'month').endOf('month')
    }]
  ```

We also added custom formatting for the placeholder text on the single date picker if the date is not required.

- **placeholder** `[string]`
  - Set placeholder text (note this will only apply if the required key is set to `false`)

Last but not least we also added support for locale based first day of the week.

## 1.0.5 Update
Version 1.0.5 sees two major improvements.

The first is you can now add a `required` key for the single date picker if you'd like to break the default and generate a picker with a placeholder rather then a predated input.

```js
new Calendar({
  element: $('.daterange--single'),
  current_date: 'June 15, 2015',
  format: {input: 'M/D/YYYY'},
  required: false
});
```

![](http://tyler.link/dw0p/Screen%20Shot%202015-11-27%20at%202.36.06%20PM.png)

Note the input format will be the placeholder. Cool huh?

The second is that *finally* the picker's callback function will only fire if the dates have actually changed. Before the function would fire regardless of what dates were chosen. So dumb. We're smarter now.

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
