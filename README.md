### run 

```

var ext    =  (await fetch('https://raw.githubusercontent.com/javascript-2020/ext-code/main/loader.js').then(res=>res.text().then(eval)))(null);

```

then you are able to do

```

console.log(await ext.libs.js.string.hs(1000));    //  1 kB

```

once a function is loaded theres no need to await it anymore

### load in the background

```
ext.defer.libs['js/string/hs'];

or

var hs    =  await ext.defer.libs['js/string/hs'];
```

```
await ext.defer.libs('js/string/hs','js/string/wildcard');

var [hs,wildcard]    =  await ext.defer.libs('js/string/hs','js/string/wildcard');


//off we go

```

### github

```
var url      =    `${owner}:${repo}:${branch}:${path}`;

var rando    =    'nastyox:Rando.js:2.0.0-cryptographically-secure-version:code/plain-javascript/2.0.0/rando.js';
var n        = await ext.github[rando]();
console.log(n);
```

```
var rando    =    'nastyox:Rando.js:2.0.0-cryptographically-secure-version:code/plain-javascript/2.0.0/rando.js';
await ext.defer.github[rando]();

var n=ext.github[rando]();
console.log(n);


```

### local

```

var result        =    ext.local['/work/tmp/test.js'](1,2,3);

```



### other run types

```
    - (await fetch('https://raw.githubusercontent.com/javascript-2020/ext-code/main/loader.js').then(res=>res.text().then(eval)))();
    
    - (await fetch('https://raw.githubusercontent.com/javascript-2020/ext-code/main/loader.js').then(res=>res.text().then(eval)))(window,'ext');
    
    - var ext   = (await fetch('https://raw.githubusercontent.com/javascript-2020/ext-code/main/loader.js').then(res=>res.text().then(eval)))(null);
    
    - ( (typeof ext=='undefined') &&
        (ext=(await fetch('https://raw.githubusercontent.com/javascript-2020/ext-code/main/loader.js').then(res=>res.text().then(eval)))(null))
      );
      
    - var loader    = await fetch('https://raw.githubusercontent.com/javascript-2020/ext-code/main/loader.js').then(res=>res.text().then(eval));
        - loader();
        - loader(window);
        - loader(window,'test');

```





