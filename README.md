run 

```
var ext    =  fetch('https://raw.githubusercontent.com/javascript-2020/ext-code/main/loader.js').then(res=>res.text().then(eval));
```

then you are able to do

```
console.log(await ext.libs.js.string.hs(1000));    //  1 kB
```





