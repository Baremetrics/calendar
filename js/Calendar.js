function Calendar(e){var t=this;this.calIsOpen=!1,this.presetIsOpen=!1,this.type=e.type||"single",this.element=e.element||$(".daterange"),this.selected=null,this.earliest=e.earliest_date||new Date("January 1, 1900"),this.latest=e.latest_date||new Date("December 31, 2900"),this.end_date=e.end_date||"double"==e.type?new Date:null,this.start_date=e.start_date||"double"==e.type?new Date(moment(this.end_date).subtract(1,"month")):null,this.current_date=null,this.callback=e.callback||null,this.calendarHTML(e.type),$(".dr-presets",this.element).click(function(){t.presetToggle()}),$(".dr-list-item",this.element).click(function(){var e=$(".dr-item-aside",this).html().split("–");t.start_date=new Date(e[0]),t.end_date=new Date(e[1]),t.calendarSetDates(),t.presetToggle(),t.calendarSaveDates()}),$(".dr-date",this.element).on({click:function(){t.calendarOpen(this)},keyup:function(e){9!=e.keyCode||t.calIsOpen||t.start_date||t.end_date||t.calendarOpen(this)},keydown:function(e){13==e.keyCode&&(e.preventDefault(),t.calendarCheckDates(),t.calendarSetDates(),t.calendarClose("force"),($(t.selected).hasClass("dr-date-start")||$(t.selected).hasClass("dr-date-end"))&&t.calendarSaveDates()),27==e.keyCode&&(t.calendarSetDates(),t.calendarClose("force")),9==e.keyCode&&($(t.selected).hasClass("dr-date-start")?(e.preventDefault(),$(".dr-date-end",t.element).trigger("click")):$(t.selected).hasClass("dr-date-end")?(e.preventDefault(),t.calendarCheckDates(),t.calendarSaveDates(),t.calendarClose("force")):(t.calendarCheckDates(),t.calendarSetDates(),t.calendarClose("force")))}}),$(".dr-month-switcher i",this.element).click(function(){var e=$(".dr-month-switcher span",t.element).html(),a=$(".dr-year-switcher span",t.element).html(),s=moment(new Date(e+" 1, "+a)).subtract(1,"month"),d=moment(new Date(e+" 1, "+a)).add(1,"month").startOf("day");$(this).hasClass("dr-left")?($(this).parent().find("span").html(s.format("MMMM")),t.calendarOpen(t.selected,s)):$(this).hasClass("dr-right")&&($(this).parent().find("span").html(d.format("MMMM")),t.calendarOpen(t.selected,d))}),$(".dr-year-switcher i",this.element).click(function(){var e=$(".dr-month-switcher span",t.element).html(),a=$(".dr-year-switcher span",t.element).html(),s=moment(new Date(e+" 1, "+a)).subtract(1,"year"),d=moment(new Date(e+" 1, "+a)).add(1,"year").startOf("day");$(this).hasClass("dr-left")?($(this).parent().find("span").html(s.format("YYYY")),t.calendarOpen(t.selected,s)):$(this).hasClass("dr-right")&&($(this).parent().find("span").html(d.format("YYYY")),t.calendarOpen(t.selected,d))}),$(".dr-dates-dash",this.element).click(function(){$(".dr-date-start",t.element).trigger("click")}),$(this.element).click(function(e){$("html").one("click",function(){t.presetIsOpen&&t.presetToggle(),t.calIsOpen&&(t.calendarSetDates(),t.calendarClose("force"))}),e.stopPropagation()}),$(this.element).add(".dr-date",this.element).focus(function(e){$("html").one("click",function(){t.calIsOpen&&(t.calendarSetDates(),t.calendarClose("force"))}),e.stopPropagation()})}Calendar.prototype.presetToggle=function(){0==this.presetIsOpen?(this.presetIsOpen=!0,this.presetCreate()):this.presetIsOpen&&(this.presetIsOpen=!1),1==this.calIsOpen&&this.calendarClose(),$(".dr-preset-list",this.element).slideToggle(200),$(".dr-input",this.element).toggleClass("active"),$(".dr-presets",this.element).toggleClass("active")},Calendar.prototype.presetCreate=function(){var e=this,t=this.latest,a=new Date($(".dr-date-start",e.element).html()),s=new Date($(".dr-date-end",e.element).html());this.start_date="Invalid Date"==a?this.start_date:a,this.end_date="Invalid Date"==s?this.end_date:s,$(".dr-list-item",this.element).each(function(){var a,s=$(this).data("months"),d=moment(t).endOf("month").startOf("day"),r=d.isSame(t);r||(d=moment(t).subtract(1,"month").endOf("month").startOf("day")),"number"==typeof s?(a=moment(t).subtract(r?s-1:s,"month").startOf("month"),12==s&&(a=moment(t).subtract(r?12:13,"month").endOf("month").startOf("day"))):"all"==s?(a=moment(e.earliest),d=moment(e.latest)):(a=moment(e.latest).subtract(30,"day"),d=moment(e.latest)),$(".dr-item-aside",this).html(a.format("ll")+" – "+d.format("ll"))})},Calendar.prototype.calendarSetDates=function(){if($(".dr-date-start",this.element).html(moment(this.start_date).format("MMMM D, YYYY")),$(".dr-date-end",this.element).html(moment(this.end_date).format("MMMM D, YYYY")),!this.start_date&&!this.end_date){var e=$(".dr-date",this.element).html(),t=moment(this.current_date).format("MMMM D, YYYY");e!=t&&$(".dr-date",this.element).html(t)}},Calendar.prototype.calendarSaveDates=function(){return this.callback()},Calendar.prototype.calendarCheckDates=function(){var e=/(?!<=\d)(st|nd|rd|th)/,t=$(".dr-date-start",this.element).html(),a=$(".dr-date-end",this.element).html(),s=$(this.selected).html(),d=[],r=[],n=[];return t&&(t=t.replace(e,""),d=t.split(" ")),a&&(a=a.replace(e,""),r=a.split(" ")),s&&(s=s.replace(e,""),n=s.split(" ")),2==d.length&&(d.push(moment().format("YYYY")),t=d.join(" ")),2==r.length&&(r.push(moment().format("YYYY")),a=r.join(" ")),2==n.length&&(n.push(moment().format("YYYY")),s=n.join(" ")),t=new Date(t),a=new Date(a),s=new Date(s),moment(t).isAfter(a)||moment(a).isBefore(t)||moment(t).isSame(a)||moment(t).isBefore(this.earliest)||moment(a).isAfter(this.latest)?this.calendarSetDates():(this.start_date="Invalid Date"==t?this.start_date:t,this.end_date="Invalid Date"==a?this.end_date:a,void(this.current_date="Invalid Date"==s?this.current_date:s))},Calendar.prototype.calendarOpen=function(e,t){var a,s=this,d=$(".dr-dates",this.element).innerWidth()-8;this.selected=e||this.selected,1==this.presetIsOpen&&this.presetToggle(),1==this.calIsOpen&&this.calendarClose(t?"switcher":void 0),this.calendarCheckDates(),this.calendarCreate(t),this.calendarSetDates();var r=moment(t||this.current_date).add(1,"month").startOf("month").startOf("day"),n=moment(t||this.current_date).subtract(1,"month").endOf("month"),l=moment(t||this.current_date).add(1,"year").startOf("month").startOf("day"),i=moment(t||this.current_date).subtract(1,"year").endOf("month");$(".dr-month-switcher span",this.element).html(moment(t||this.current_date).format("MMMM")),$(".dr-year-switcher span",this.element).html(moment(t||this.current_date).format("YYYY")),$(".dr-switcher i",this.element).removeClass("dr-disabled"),r.isAfter(this.latest)&&$(".dr-month-switcher .dr-right",this.element).addClass("dr-disabled"),n.isBefore(this.earliest)&&$(".dr-month-switcher .dr-left",this.element).addClass("dr-disabled"),l.isAfter(this.latest)&&$(".dr-year-switcher .dr-right",this.element).addClass("dr-disabled"),i.isBefore(this.earliest)&&$(".dr-year-switcher .dr-left",this.element).addClass("dr-disabled"),$(".dr-day",this.element).on({mouseenter:function(){function e(e){a=void 0,$.each(_.range(42),function(d){var r=t.next().data("date"),n=t.prev().data("date"),l=t.data("date");return l?(n||(n=l),r||(r=l),"start"==e&&moment(r).isSame(s.end_date)?!1:"end"==e&&moment(n).isSame(s.start_date)?!1:"start"==e&&moment(l).isAfter(s.end_date)&&(a=a||moment(l).add(6,"day").startOf("day"),d>5||(r?moment(r).isAfter(s.latest):!1))?($(t).addClass("dr-end"),a=moment(l),!1):"end"==e&&moment(l).isBefore(s.start_date)&&(a=a||moment(l).subtract(6,"day"),d>5||(n?moment(n).isBefore(s.earliest):!1))?($(t).addClass("dr-start"),a=moment(l),!1):("start"==e&&(t=t.next().addClass("dr-maybe")),void("end"==e&&(t=t.prev().addClass("dr-maybe"))))):!1})}var t=$(this),d=moment(s.start_date),r=moment(s.end_date),n=moment(s.current_date);d.isSame(n)&&(t.addClass("dr-hover dr-hover-before"),$(".dr-start",s.element).css({border:"none","padding-left":"0.3125rem"}),e("start")),r.isSame(n)&&(t.addClass("dr-hover dr-hover-after"),$(".dr-end",s.element).css({border:"none","padding-right":"0.3125rem"}),e("end")),s.start_date||s.end_date||t.addClass("dr-maybe"),$(".dr-selected",s.element).css("background-color","transparent")},mouseleave:function(){$(this).hasClass("dr-hover-before dr-end")&&$(this).removeClass("dr-end"),$(this).hasClass("dr-hover-after dr-start")&&$(this).removeClass("dr-start"),$(this).removeClass("dr-hover dr-hover-before dr-hover-after"),$(".dr-start, .dr-end",s.element).css({border:"",padding:""}),$(".dr-maybe:not(.dr-current)",s.element).removeClass("dr-start dr-end"),$(".dr-day",s.element).removeClass("dr-maybe"),$(".dr-selected",s.element).css("background-color","")},mousedown:function(){var e=$(this).data("date"),t=moment(e).format("MMMM D, YYYY");a&&$(".dr-date",s.element).not(s.selected).html(a.format("MMMM D, YYYY")),$(s.selected).html(t),s.calendarOpen(s.selected),$(s.selected).hasClass("dr-date-start")?$(".dr-date-end",s.element).trigger("click"):$(s.selected).hasClass("dr-date-end")?(s.calendarSaveDates(),s.calendarClose("force")):s.calendarClose("force")}}),$(".dr-calendar",this.element).css("width",d).slideDown(200),$(".dr-input",this.element).addClass("active"),$(e).addClass("active").focus(),this.calIsOpen=!0},Calendar.prototype.calendarClose=function(e){var t=this;return!this.calIsOpen||this.presetIsOpen||"force"==e?($(".dr-date-start, .dr-date-end",this.element).blur(),$(".dr-calendar",this.element).slideUp(200,function(){$(".dr-day",t.element).remove()})):$(".dr-day",this.element).remove(),"switcher"==e?!1:($(".dr-input, .dr-date",this.element).removeClass("active"),void(this.calIsOpen=!1))},Calendar.prototype.calendarArray=function(e,t,a,s){var d=this,a=a||e||t,r=moment(s||a).startOf("month"),n=moment(s||a).endOf("month"),l={start:{day:+r.format("d"),str:+r.format("D")},end:{day:+n.format("d"),str:+n.format("D")}},i=void 0,o=_.map(_.range(l.start.day),function(){return void 0==i&&(i=moment(r)),i=i.subtract(1,"day"),{str:+i.format("D"),start:i.isSame(e),end:i.isSame(t),current:i.isSame(a),selected:i.isBetween(e,t),date:i.toISOString(),outside:i.isBefore(d.earliest),fade:!0}}).reverse(),c=42-(l.end.str+o.length);i=void 0;var m=_.map(_.range(c),function(){return void 0==i&&(i=moment(n)),i=i.add(1,"day").startOf("day"),{str:+i.format("D"),start:i.isSame(e),end:i.isSame(t),current:i.isSame(a),selected:i.isBetween(e,t),date:i.toISOString(),outside:i.isAfter(d.latest),fade:!0}});i=void 0;var h=_.map(_.range(l.end.str),function(){return i=void 0==i?moment(r):i.add(1,"day").startOf("day"),{str:+i.format("D"),start:i.isSame(e),end:i.isSame(t),current:i.isSame(a),selected:i.isBetween(e,t),date:i.toISOString(),outside:i.isBefore(d.earliest)||i.isAfter(d.latest)}});return o.concat(h,m)},Calendar.prototype.calendarCreate=function(e){var t=this,a=this.calendarArray(this.start_date,this.end_date,this.current_date,e);_.each(a,function(e,a){var s="dr-day";e.fade&&(s+=" dr-fade"),e.start&&(s+=" dr-start"),e.end&&(s+=" dr-end"),e.current&&(s+=" dr-current"),e.selected&&(s+=" dr-selected"),e.outside&&(s+=" dr-outside"),$(".dr-day-list",t.element).append('<li class="'+s+'" data-date="'+e.date+'">'+e.str+"</li>")})},Calendar.prototype.calendarHTML=function(e){return this.element.append("double"==e?'<div class="dr-input"><div class="dr-dates"><div class="dr-date dr-date-start" contenteditable>'+moment(this.start_date).format("MMMM D, YYYY")+'</div><span class="dr-dates-dash">–</span><div class="dr-date dr-date-end" contenteditable>'+moment(this.end_date).format("MMMM D, YYYY")+'</div></div><div class="dr-presets"><span class="dr-preset-bar"></span><span class="dr-preset-bar"></span><span class="dr-preset-bar"></span></div></div><div class="dr-selections"><div class="dr-calendar" style="display: none;"><div class="dr-range-switcher"><div class="dr-switcher dr-month-switcher"><i class="dr-left"></i><span>April</span><i class="dr-right"></i></div><div class="dr-switcher dr-year-switcher"><i class="dr-left"></i><span>2015</span><i class="dr-right"></i></div></div><ul class="dr-days-of-week-list"><li class="dr-day-of-week">S</li><li class="dr-day-of-week">M</li><li class="dr-day-of-week">T</li><li class="dr-day-of-week">W</li><li class="dr-day-of-week">T</li><li class="dr-day-of-week">F</li><li class="dr-day-of-week">S</li></ul><ul class="dr-day-list"></ul></div><ul class="dr-preset-list" style="display: none;"><li class="dr-list-item" data-months="days">Last 30 days <span class="dr-item-aside"></span></li><li class="dr-list-item" data-months="1">Last month <span class="dr-item-aside"></span></li><li class="dr-list-item" data-months="3">Last 3 months <span class="dr-item-aside"></span></li><li class="dr-list-item" data-months="6">Last 6 months <span class="dr-item-aside"></span></li><li class="dr-list-item" data-months="12">Last year <span class="dr-item-aside"></span></li><li class="dr-list-item" data-months="all">All time <span class="dr-item-aside"></span></li></ul></div>':'<div class="dr-input"><div class="dr-dates"><div class="dr-date" contenteditable>'+moment().format("MMMM D, YYYY")+'</div></div></div><div class="dr-selections"><div class="dr-calendar" style="display: none;"><div class="dr-range-switcher"><div class="dr-switcher dr-month-switcher"><i class="dr-left"></i><span></span><i class="dr-right"></i></div><div class="dr-switcher dr-year-switcher"><i class="dr-left"></i><span></span><i class="dr-right"></i></div></div><ul class="dr-days-of-week-list"><li class="dr-day-of-week">S</li><li class="dr-day-of-week">M</li><li class="dr-day-of-week">T</li><li class="dr-day-of-week">W</li><li class="dr-day-of-week">T</li><li class="dr-day-of-week">F</li><li class="dr-day-of-week">S</li></ul><ul class="dr-day-list"></ul></div></div>')};