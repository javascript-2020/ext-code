

/*
aab


        var url   = `https://api.github.com/repos/javascript-2020/ext-code/contents/loader.js`,opts={headers:{accept:'application/vnd.github.raw+json'}};
        fetch(url,opts).then(res=>res.text().then(eval))();
        
        fetch(`https://api.github.com/repos/javascript-2020/ext-code/contents/loader.js`,{headers:{accept:'application/vnd.github.raw+json'}}).then(res=>res.text().then(eval))();
        
        
        
        (await fetch('https://raw.githubusercontent.com/javascript-2020/ext-code/main/loader.js').then(res=>res.text().then(eval)))();
        
        (await fetch('https://raw.githubusercontent.com/javascript-2020/ext-code/main/loader.js').then(res=>res.text().then(eval)))(window,'ext');
        
        var ext   = (await fetch('https://raw.githubusercontent.com/javascript-2020/ext-code/main/loader.js').then(res=>res.text().then(eval)))(null);
        
        ( (typeof ext=='undefined') &&
          (ext=(await fetch('https://raw.githubusercontent.com/javascript-2020/ext-code/main/loader.js').then(res=>res.text().then(eval)))(null))
        );
        
        var loader    = await fetch('https://raw.githubusercontent.com/javascript-2020/ext-code/main/loader.js').then(res=>res.text().then(eval));
        loader();
        loader(window);
        loader(window,'test');
        
        
        
        
        var ext   = (await new Promise(resolve=>{
              var loader    = 'https://raw.githubusercontent.com/javascript-2020/ext-code/main/loader.js',body='';
              require('https').get(loader,async res=>{for await(data of res)body+=data;resolve(eval(body))}).end();
        }))();
        
        
  fs
  --
  
        var ext     = eval(require('fs').readFileSync(require('base').root+'projects/ext-code/loader.js','utf8'))();
        
        
        
*/



//var loader    =


(()=>{

      return loader;
      
function loader(attach,name='ext',override){

      var mod                   = 'ext-code';
      
      var ext                   = {};
      ext[Symbol.toStringTag]   = mod;
      
      
      if(attach){
            if(is(attach[name])){
                  return attach[name];
            }
            if(!override){
                  throw `unable to create globalThis.${name}`;
            }
            attach[name]    = ext;
      }else{
            if(attach!==null){
                  if(globalThis[name]){
                        if(is(globalThis[name])){
                              return globalThis[name];
                        }
                        if(!override){
                              throw `unable to create globalThis.${name}`;
                        }
                  }
                  globalThis[name]    = ext;
            }
      }
                                                                                console.clear();
                                                                                console.log('ext-code.loader-v1.1');
                                                                                console.log();
      ext.defer         = {};
      
      create('code','javascript-2020','ext-code','main');
      create('libs','javascript-2020','libs','main');
      
      //snippets();
      
      local();
      
      github();
      
      
      return ext;
      
      
      function is(v){
      
            var str       = Object.prototype.toString.call(v);
            str           = str.slice(8,-1);
            var result    = (str==mod);
            return result;
            
      }//is
      
      function create(type,owner,repo,branch){
                                                                                //console.log('create',type);
            var list      = {};
            
            
            ext.defer[type]=new Proxy(()=>{},{get,apply});
            
            async function get(target,prop){
                                                                                //console.log('defer.proxy',prop);
                  var lname   = prop.replaceAll('/','.');
                  if(list[lname]){
                        return list[lname];
                  }
                  var fn        = await load(lname);
                  return fn;
                  
            }//get
            
            function apply(target,thisArg,args){
            
                  return Promise.all(args.map(arg=>get(target,arg)));
                  
            }//apply
            
            
            ext[type] = modproxy(list,notfound);
            
            async function notfound(lname,args){
            
                  var fn        = await load(lname);
                  if(typeof fn!='function'){
                        return fn;
                  }
                  var result    = fn.apply(null,args);
                  return result;
                  
            }//notfound
            
            
            async function load(lname){
                                                                                //console.log('load',lname);
                  var file    = lname.replaceAll('.','/');
                  var url     = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${file}`;
                  var res     = await fetch(url);
                  if(!res.ok){
                        console.log('failed to load remote-function: '+file);
                        return '[ not found '+file+' ]';
                  }
                  
                  var fnstr       = await res.text();
                  var fn          = define(fnstr);
                  
                  ext[type][lname]     = fn;
                  
                  return fn;
                  
            }//load
            
      }//create
      
      
      function snippets(){
      }//snippets
      
      
      function github(){
      
            var list    = {};
            
            ext.defer.github=new Proxy(()=>{},{get,apply});
            
            async function get(target,prop){
                                                                                //console.log('defer.proxy',prop);
                  if(list[lname]){
                        return list[lname];
                  }
                  var fn        = await load(lname);
                  return fn;
                  
            }//get
            
            function apply(target,thisArg,args){
            
                  return Promise.all(args.map(arg=>get(target,arg)));
                  
            }//apply
            
            
            ext.github    = modproxy(list,notfound);
            
            async function notfound(lname,args){
            
                  var parts     = lname.split(':');
                  var owner     = parts[0];
                  var repo      = parts[1];
                  var branch    = parts.length==4 ? parts[2] : 'main';
                  var file      = parts.at(-1);
                  
                  var fn        = await load(owner,repo,branch,file);
                  if(typeof fn!='function'){
                        return fn;
                  }
                  var result    = fn.apply(null,args);
                  return result;
                  
          }//notfound
          
          async function load(owner,repo,branch,file){
          
                  var url     = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${file}`;
                  var res     = await fetch(url);
                  if(!res.ok){
                        console.log('failed to load remote-function: '+file);
                        return '[ not found '+file+' ]';
                  }
                  
                  var fnstr       = await res.text();
                  var fn          = define(fnstr);
                  
                  var lname             = `${owner}:${repo}:${branch}:${file}`;
                  ext.github[lname]     = fn;
                  
                  return fn;
                  
            }//notfound
            
      }//remote
      
      
      function local(){
      
            var list    = {};
            
            ext.defer.local=new Proxy(()=>{},{get,apply});
            
            function get(target,prop){
                                                                                //console.log('defer.proxy',prop);
                  if(list[prop]){
                        return list[prop];
                  }
                  var fn    = load(prop);
                  return fn;
                  
            }//get
            
            function apply(target,thisArg,args){
            
                  return args.map(arg=>get(target,arg));
                  
            }//apply
            
            
            ext.local    = modproxy(list,notfound);
            
            function notfound(prop,args,thisarg=null){
            
                  var fn        = load(prop);
                  if(typeof fn!='function'){
                        return fn;
                  }
                  var result    = fn.apply(thisarg,args);
                  return result;
                  
          }//notfound
          
          function load(file){
                                                                                console.log('local.load',file);
                  var fnstr     = fs.readFileSync(file,'utf8');
                  var fn        = define(fnstr);
                  
                  ext.local[file]   = fn;
                  
                  return fn;
                  
            }//load
            
      }//local
      
      
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
      
      
      function modproxy(mem,notfound){
      
            return newproxy();
            
            
            function getter(target,name,receiver,lname){
            
                  if(lname){
                        lname  += '.';
                  }
                  lname  += name;
                                                                                console.log(`rd : ${lname}`);
                  if(lname in mem){
                                                                                console.log('f');
                        return mem[lname];
                  }
                  return newproxy(()=>{},lname);
                  
            }//getter
            
            
            function setter(target,name,newval,lname){
            
                  lname  += '.'+name;
                  lname   = lname.slice(1);
                                                                                console.log(`wt : ${lname} - ${newval}`);
                  mem[lname]    = newval;
                  
            }//setter
            
            
            function applyer(target,thisArg,args,lname){
            
                  //lname   = lname.slice(1);
                  
                  if(lname in mem){
                        var v   = mem[lname];
                        if(typeof v==='function'){
                                                                                //console.log(`fn : ${lname} - [${args}]`);
                              return v.apply(thisArg,args);
                        }
                        return v;
                  }
                                                                                //console.log(`fn (not found): ${lname} - [${args}]`);
                  return notfound(lname,args);
                  
            }//applyer
            
            
            function newproxy(target,lname){
            
                  target    = target||(()=>{});
                  lname     = lname||'';
                  
                  var proxy   = new Proxy(target,{
                                      get:(target,name,receiver)=>getter(target,name,receiver,lname),
                                      set:(target,name,newval)=>setter(target,name,newval,lname),
                                      apply:(target,thisArg,args)=>applyer(target,thisArg,args,lname)
                                });
                                
                  return proxy;
                  
            }//newproxy
            
      }//modproxy
      
}//loader


})();



