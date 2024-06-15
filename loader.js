

/*
aab


var url   = `https://api.github.com/repos/javascript-2020/ext-code/contents/loader.js`,opts={headers:{accept:'application/vnd.github.raw+json'}};
fetch(url,opts).then(res=>res.text()).then(eval))();

(await fetch(`https://api.github.com/repos/javascript-2020/ext-code/contents/loader.js`,{headers:{accept:'application/vnd.github.raw+json'}}).then(res=>res.text()).then(eval))();



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




(await new Promise(resolve=>{
      var loader    = 'https://raw.githubusercontent.com/javascript-2020/ext-code/main/loader.js',body='';
      require('https').get(loader,async res=>{for await(data of res)body+=data;resolve(eval(body))}).end();
}))();


  fs
  --
  
eval(require('fs').readFileSync(require('base').root+'projects/ext-code/loader.js','utf8'))();



*/



//var loader    =


(()=>{

      return loader;
      
function loader(attach,name='ext',override=true){
                                                                                console.clear();
                                                                                console.log('ext-code.loader-v1.1');
                                                                                console.log();
  var ext                   = {};
  ext[Symbol.toStringTag]   = 'ext-code';
  
  
        if(attach){
              if(is(attach[name])){
                    return attach[name];
              }
              if(!override){
                    throw `unable to create attach.${name}`;
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
        
        
        ext.load          = {};
        ext.create        = {};
        create();
        
        ext.create.repo('code','javascript-2020','ext-code','main');
        ext.create.repo('libs','javascript-2020','libs','main','js/');
        local();
        github();
        
        
        //snippets();
        
        
        
        
        return ext;
        
        
        function is(v){
        
              var str       = Object.prototype.toString.call(v);
              str           = str.slice(8,-1);
              console.log(str,ext[Symbol.toStringTag]);
              var result    = (str==ext[Symbol.toStringTag]);
              return result;
              
        }//is
        
        
        function create(){
        
              ext.create.repo=function(name,owner,repo,branch,def_dir){
                                                                                //console.log('create',type);
                    var list      = {};
                    
                    
                    var load    = {};
                    
                    load.get=async function(target,prop){
                                                                                //console.log('defer.proxy',prop);
                          var lname   = prop.split('/');
                          var key     = modproxy.key(lname);
                          
                          if(list[key]){
                                return list[key];
                          }
                          var fn        = await load.text(prop,lname);
                          return fn;
                          
                    }//get
                    
                    load.apply=function(target,thisArg,args){
                    
                          return Promise.all(args.map(arg=>load.get(target,arg)));
                          
                    }//apply
                    
                    ext.load[name]=new Proxy(()=>{},{get:load.get,apply:load.apply});
                    
                    
                    ext[name] = modproxy(list,notfound);
                    
                    async function notfound(lname,args){
                                                                                //console.log('notfound',lname);
                          var file    = lname.join('/');
                          var fn      = await load.text(file,lname);
                          if(typeof fn!='function'){
                                return fn;
                          }
                          var result    = await fn.apply(null,args);
                          return result;
                          
                    }//notfound
                    
                    
                    load.text=async function(file,lname){
                                                                                //console.log('load',lname);
                          if(def_dir){
                                file    = def_dir+file;
                          }
                          var url     = `https://api.github.com/repos/${owner}/${repo}/contents/${file}`;
                          if(branch){
                                url  += `?ref=${branch}`;
                          }
                          var opts    = {headers:{accept:'application/vnd.github.raw+json'}};
                          var res     = await fetch(url,opts);
                          
                          if(!res.ok){
                                                                                console.log('failed to load remote-function: '+file);
                                return '[ not found '+file+' ]';
                          }
                          
                          var fnstr       = await res.text();
                          var fn          = define(fnstr);
                          
                          var key           = modproxy.key(lname);
                          ext[name][key]    = fn;
                          
                          return fn;
                          
                    }//load
                    
              }//create.repo
              
        }//create
        
        
        function snippets(){
        }//snippets
        
        
        function github(){
        
              var list    = {};
              
              var load    = {};
              var cur;
              var proxy   = {};
              
              load.get=async function(target,prop){
                                                                                  //console.log('defer.proxy',prop);
                    if(list[lname]){
                          return list[lname];
                    }
                    var fn        = await load(lname);
                    return fn;
                    
              }//get
              
              load.apply=function(target,thisArg,args){
              
                    return Promise.all(args.map(arg=>load.get(target,arg)));
                    
              }//apply
              
              ext.load.github=new Proxy(()=>{},{get:load.get,apply:load.apply});
              
              
              proxy.get=async function(target,prop){
              
                    cur   = prop;
                    if(list[prop]){
                          return list[prop];
                    }
                    var {owner,repo,branch,file}    = parse(prop);
                    var fn    = await load.text(owner,repo,branch,file);
                    
                    ext.github[prop]    = fn;
                    
                    return fn;
                    
              }//get2
              
              proxy.apply=async function(target,thisArg,args){
              
                    var fn    = list[cur];
                    if(typeof fn!='function'){
                          return fn;
                    }
                    var result    = await fn.apply(thisArg,args);
                    return result;
                    
              }//apply2
              
              ext.github    = new Proxy({},{get:proxy.get,apply:proxy.apply});
              
              
              async function notfound(lname,args){
              
                    var {owner,repo,branch,file}    = parse(lname);
                    
                    var fn        = await load.text(owner,repo,branch,file);
                    if(typeof fn!='function'){
                          return fn;
                    }
                    var result    = await fn.apply(null,args);
                    return result;
                    
              }//notfound
              
              load.text=async function(owner,repo,branch,file){
              
                    var url     = `https://api.github.com/repos/${owner}/${repo}/contents/${file}`;
                    if(branch){
                          url  += `?ref=${branch}`;
                    }
                    var opts    = {headers:{accept:'application/vnd.github.raw+json'}};
                    //var url     = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${file}`;
                    var res     = await fetch(url,opts);
                    
                    if(!res.ok){
                          console.log('failed to load remote-function: '+file);
                          return '[ not found '+file+' ]';
                    }
                    
                    var fnstr       = await res.text();
                    var fn          = define(fnstr);
                    
                    var lname             = `${owner}:${repo}:${branch}:${file}`;
                    ext.github[lname]     = fn;
                    
                    return fn;
                    
              }//load
              
              function parse(prop){
              
                    var parts     = prop.split(':');
                    
                    var owner     = parts[0];
                    var repo      = parts[1];
                    var branch    = parts.length==4 ? parts[2] : null;
                    var file      = parts.at(-1);
                    
                    return {owner,repo,branch,file};
                    
              }//parse
              
        }//github
        
        
        function local(){
        
              var list    = {};
              
              var load    = {};
              var cur;
              var proxy   = {};
              
              
              load.get=function(target,prop){
                                                                                  //console.log('defer.proxy',prop);
                    if(list[prop]){
                          return list[prop];
                    }
                    var fn    = load.text(prop);
                    return fn;
                    
              }//get
              
              load.apply=function(target,thisArg,args){
              
                    return args.map(arg=>load.get(target,arg));
                    
              }//apply
              
              ext.load.local    = new Proxy(()=>{},{get:load.get,apply:load.apply});
              
              
              
              proxy.get=function(target,prop){
              
                    cur   = prop;
                    if(list[prop]){
                          return list[prop];
                    }
                    var fn    = load.text(prop);
                    return fn;
                    
              }//get
              
              proxy.apply=function(target,thisArg,args){
              
                    var fn    = list[cur];
                    
                    if(typeof fn!='function'){
                          return fn;
                    }
                    var result    = fn.apply(thisArg,args);
                    return result;
                    
              }//apply
              
              ext.local    = new Proxy({},{get:proxy.get,apply:proxy.apply});
              
              
              load.text=function(file){
                                                                                //console.log('local.load',file);
                    var fnstr     = fs.readFileSync(file,'utf8');
                    var fn        = define(fnstr);
                    
                    ext.local[file]   = fn;
                    
                    return fn;
                    
              }//load
              
        }//local
        
  //:
  
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
        
              modproxy.key    = lname=>lname.join(',');
              
              return newproxy();
              
              
              function getter(target,name,receiver,lname){
              
                    lname   = structuredClone(lname);
                    lname.push(name);
                    var key   = modproxy.key(lname);
                                                                                  //console.log(`rd : ${key}`);
                    if(key in mem){
                                                                                  //console.log('found');
                          return mem[key];
                    }
                    return newproxy(()=>{},lname);
                    
              }//getter
              
              
              function setter(target,name,newval,lname){
              
                    lname   = structuredClone(lname);
                    lname.push(name);
                    var key   = modproxy.key(lname);
                                                                                  //console.log(`wt : ${key} - ${newval}`);
                    mem[key]    = newval;
                    
              }//setter
              
              
              function applyer(target,thisArg,args,lname){
              
                    var key   = modproxy.key(lname);
                    if(key in mem){
                          var v   = mem[key];
                          if(typeof v==='function'){
                                                                                  //console.log(`fn : ${lname} - [${args}]`);
                                return v.apply(thisArg,args);
                          }
                          return v;
                    }
                                                                                  //console.log(`fn (not found): ${lname} - [${args}]`);
                    return notfound(lname,args);
                    
              }//applyer
              
              
              function newproxy(target=()=>{},lname=[]){
              
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



