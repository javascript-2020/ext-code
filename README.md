### run 

```

var ext    =  (await fetch('https://raw.githubusercontent.com/javascript-2020/ext-code/main/loader.js').then(res=>res.text().then(eval)))(null);

```

then you are able to do

```

console.log(await ext.libs.js.string.hs(1000));    //  1 kB

```

once a function is loaded theres no need to await it anymore

<br>

https://github.com/javascript-2020/libs/tree/main

https://github.com/javascript-2020/ext-code/tree/main/fn



<br>
<br>
<br>


### defer

```
ext.defer.libs['js/string/hs'];

or

var hs    =  await ext.defer.libs['js/string/hs'];
```


<br>

### defer multiple

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
await ext.defer.github[rando];

var n=ext.github[rando]();
console.log(n);


```

### local

local files are loaded syncronously

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



### define

loaded text is defined as follows

```
      function define(fnstr){
                                                                                //console.log(fnstr);
            var code    = `
                  (()=>{
                  
                        var fn    = ${fnstr};
                        return fn;
                        
                  })();
            `;
            
            var fn    = eval(code);
                                                                                //console.log(fn);
            return fn;
            
      }//define
```

so the following are permissible syntaxes

```
function(){
    alert(1);
}
```

```
function mod(a,b,c){
    alert(a+' '+b+' '+c);
}
```



