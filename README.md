run 

```
var ext    =  fetch('https://raw.githubusercontent.com/javascript-2020/ext-code/main/loader.js').then(res=>res.text().then(eval));
```

then you are able to do

```
console.log(await ext.libs.js.string.hs(1000));    //  1 kB
```

once its loaded theres no need to await it anymore

<br>

load in the background
```
ext.defer.libs.js.string.hs

or

await ext.defer.libs.js.string.hs
```

<br>

```
await Promise.all(ext.defer.libs('js/string/hs','js/string/wildcard'));

//off we go
```






