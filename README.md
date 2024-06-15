

## ext-code

dont ask me what it is yet, i havent decided


### run 

```

var ext    =  (await fetch('https://raw.githubusercontent.com/javascript-2020/ext-code/main/loader.js').then(res=>res.text().then(eval)))(null);

```

then you are able to do

```

console.log(await ext.libs.string.hs(1000));    //  1 kB

```

once a function is loaded theres no need to await it anymore

<br>

https://github.com/javascript-2020/libs/tree/main

https://github.com/javascript-2020/ext-code/tree/main/fn



<br>
<br>
<br>


### load

```
ext.load.libs['string/hs'];

or

var hs    =  await ext.load.libs['string/hs'];
```


<br>

### load multiple

```
await ext.load.libs('string/hs','string/wildcard');
```
or
```
var [hs,wildcard]    =  await ext.load.libs('string/hs','string/wildcard');


//off we go

```

<br>

### add github repo

you can add an accessible github repo like so

owner   : random

repo    : test

branch  : main

path    : test/test

branch is optional, defaults to default branch

```
ext.create.repo('myRepo',owner,repo,branch);

var fn      = await ext.load.myRepo.test.test;
fn();
```

or

```
ext.myRepo.path.to.file.fn();
```


### github

```
var url      = `${owner}:${repo}:${branch}:${path}`;

var rando    = 'nastyox:Rando.js:2.0.0-cryptographically-secure-version:code/plain-javascript/2.0.0/rando.js';
var n        = await ext.github[rando]();
console.log(n);
```

```
var rando    = 'nastyox:Rando.js:2.0.0-cryptographically-secure-version:code/plain-javascript/2.0.0/rando.js';
await ext.load.github[rando];

var n        = ext.github[rando]();
console.log(n);
```

### local

local files are loaded syncronously

```

var result        =    ext.local['/work/tmp/test.js'](1,2,3);

```



### other ways to run

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


//  node.js

        var ext   = (await new Promise(resolve=>{
              var loader    = 'https://raw.githubusercontent.com/javascript-2020/ext-code/main/loader.js',body='';
              require('https').get(loader,async res=>{for await(data of res)body+=data;resolve(eval(body))}).end();
        }))();


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

libraries can be formed

```
    mod;
    mod.test=()=>alert('test');
    function mod(){
        alert('mod');
    }
```

configuration can be loaded

```
{
    hello:'world'
}
```









