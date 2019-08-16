const e=1e3,n=6e4,a=36e5,m=24*a,i=7*m,l=30*m,t=365*m,r={ms:{min:0,max:e,label:{one:"milisecond",many:"miliseconds"}},s:{min:e,max:n,label:{one:"second",many:"seconds"}},m:{min:n,max:a,label:{one:"minute",many:"minutes"}},h:{min:a,max:m,label:{one:"hour",many:"hours"}},d:{min:m,max:i,label:{one:"day",many:"days"}},w:{min:i,max:l,label:{one:"week",many:"weeks"}},mo:{min:l,max:t,label:{one:"month",many:"months"}},y:{min:t,max:1/0,label:{one:"year",many:"years"}}},o={ms:{min:0,max:e,label:"ms"},s:{min:e,max:n,label:"sec"},m:{min:n,max:a,label:"min"},h:{min:a,max:m,label:"hr"},d:{min:m,max:i,label:"d"},w:{min:i,max:l,label:"wk"},mo:{min:l,max:t,label:"mon"},y:{min:t,max:1/0,label:"yr"}},s={ms:{min:0,max:e,label:"ms"},s:{min:e,max:n,label:"s"},m:{min:n,max:a,label:"m"},h:{min:a,max:m,label:"h"},d:{min:m,max:i,label:"d"},w:{min:i,max:l,label:"w"},mo:{min:l,max:t,label:"mo"},y:{min:t,max:1/0,label:"y"}},c={spacer:" ",durations:s,delimiter:" ",groupLength:3,decimal:".",decimalPlaces:2};function d(e,n=1){return+ +e.toFixed(n)}function u(e,n){const a={delimiter:",",decimal:".",groupLength:3,decimalPlaces:0,...n},m=String(e).split(".");return m[0].split("").reverse().reduce((e,n,m)=>`${e}${m%a.groupLength==0?a.delimiter:""}${n}`).split("").reverse().join("")+(void 0!==m[1]?`${a.decimal}${a.decimalPlaces&&a.decimalPlaces>0?m[1].substring(0,a.decimalPlaces):m[1]}`:"")}function b(e){return e instanceof Date?e:"string"==typeof e&&/^\d+$/.test(e)?new Date(+e):new Date(e)}function x(e){return b(e).getTime()}function y(e,n){if(n.hasOwnProperty("one")&&n.hasOwnProperty("many")){const a=n;return 0===e&&a.hasOwnProperty("zero")&&a.zero?a.zero:1===e?a.one:a.many}return String(n)}function h(e,n){const a={...c,...n},m=x(e),i=Object.values(a.durations).length;let l="",t=0;if(m>0){for(const e in a.durations)if(a.durations.hasOwnProperty(e)){const n=a.durations[e];if(t++,m>=n.min&&m<n.max||t===i){const e=n.min>0?d(m/n.min,a.decimalPlaces):m;l=`${String(e).replace(".",a.decimal)}${a.spacer}${y(e,n.label)}`;break}}return l}return`0${a.spacer}${y(0,Object.values(a.durations)[0].label)}`}function p(e,n,a=c){const m=[e,n||+new Date].map(x);return h(Math.max(...m)-Math.min(...m),a)}export{c as DEFAULT_FORMAT_TIME_DURATION_OPTIONS,s as STANDARD_ABBR_DURATIONS,o as STANDARD_SHORT_DURATIONS,r as STANDARD_WORD_DURATIONS,u as formatNumber,h as formatTimeDuration,b as getDate,y as getDurationLabel,x as getTimeFromDate,p as tellTimeDuration};