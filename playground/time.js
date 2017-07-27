const moment = require('moment');

let date = moment();

console.log(date.format('Do MMM, YYYY'));


console.log(date.format('h:mm:ss A'));

console.log(moment().valueOf());

console.log(new Date().getTime());