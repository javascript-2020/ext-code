/*
import ext from 'https://raw.githubusercontent.com/javascript-2020/ext-code/main/loader.mjs
*/

var ext    =  await fetch('https://raw.githubusercontent.com/javascript-2020/ext-code/main/loader.js').then(res=>res.text().then(eval));
export default ext;