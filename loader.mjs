/*

import ext from 'https://ext-code-y2xn13bvx5py.runkit.sh/';

*/

var ext    =  await fetch('https://raw.githubusercontent.com/javascript-2020/ext-code/main/loader.js').then(res=>res.text().then(txt=>eval(txt)));
export default ext;
