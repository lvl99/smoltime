!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((e=e||self).smoltime={})}(this,function(e){"use strict";const n=1e3,a=6e4,m=36e5,i=24*m,t=7*i,l=30*i,o=365*i,r={ms:{min:0,max:n,label:{one:"milisecond",many:"miliseconds"}},s:{min:n,max:a,label:{one:"second",many:"seconds"}},m:{min:a,max:m,label:{one:"minute",many:"minutes"}},h:{min:m,max:i,label:{one:"hour",many:"hours"}},d:{min:i,max:t,label:{one:"day",many:"days"}},w:{min:t,max:l,label:{one:"week",many:"weeks"}},mo:{min:l,max:o,label:{one:"month",many:"months"}},y:{min:o,max:1/0,label:{one:"year",many:"years"}}},s={ms:{min:0,max:n,label:"ms"},s:{min:n,max:a,label:"sec"},m:{min:a,max:m,label:"min"},h:{min:m,max:i,label:"hr"},d:{min:i,max:t,label:"d"},w:{min:t,max:l,label:"wk"},mo:{min:l,max:o,label:"mon"},y:{min:o,max:1/0,label:"yr"}},c={ms:{min:0,max:n,label:"ms"},s:{min:n,max:a,label:"s"},m:{min:a,max:m,label:"m"},h:{min:m,max:i,label:"h"},d:{min:i,max:t,label:"d"},w:{min:t,max:l,label:"w"},mo:{min:l,max:o,label:"mo"},y:{min:o,max:1/0,label:"y"}},u={spacer:" ",durations:c,delimiter:" ",groupLength:3,decimal:".",decimalPlaces:2};function d(e,n=1){return+ +e.toFixed(n)}function b(e){return e instanceof Date?e:"string"==typeof e&&/^\d+$/.test(e)?new Date(+e):new Date(e)}function x(e){return b(e).getTime()}function f(e,n){if(n.hasOwnProperty("one")&&n.hasOwnProperty("many")){const a=n;return 0===e&&a.hasOwnProperty("zero")&&a.zero?a.zero:1===e?a.one:a.many}return String(n)}function y(e,n){const a={...u,...n},m=x(e),i=Object.values(a.durations).length;let t="",l=0;if(m>0){for(const e in a.durations)if(a.durations.hasOwnProperty(e)){const n=a.durations[e];if(l++,m>=n.min&&m<n.max||l===i){const e=n.min>0?d(m/n.min,a.decimalPlaces):m;t=`${String(e).replace(".",a.decimal)}${a.spacer}${f(e,n.label)}`;break}}return t}return`0${a.spacer}${f(0,Object.values(a.durations)[0].label)}`}e.DEFAULT_FORMAT_TIME_DURATION_OPTIONS=u,e.STANDARD_ABBR_DURATIONS=c,e.STANDARD_SHORT_DURATIONS=s,e.STANDARD_WORD_DURATIONS=r,e.formatNumber=function(e,n){const a={delimiter:",",decimal:".",groupLength:3,decimalPlaces:0,...n},m=String(e).split(".");return m[0].split("").reverse().reduce((e,n,m)=>`${e}${m%a.groupLength==0?a.delimiter:""}${n}`).split("").reverse().join("")+(void 0!==m[1]?`${a.decimal}${a.decimalPlaces&&a.decimalPlaces>0?m[1].substring(0,a.decimalPlaces):m[1]}`:"")},e.formatTimeDuration=y,e.getDate=b,e.getDurationLabel=f,e.getTimeFromDate=x,e.tellTimeDuration=function(e,n,a=u){const m=[e,n||+new Date].map(x);return y(Math.max(...m)-Math.min(...m),a)},Object.defineProperty(e,"__esModule",{value:!0})});