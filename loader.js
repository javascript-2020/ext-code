

/*


var url   = `https://api.github.com/repos/javascript-2020/ext-code/contents/loader.js`,
    opts  = {headers:{accept:'application/vnd.github.raw+json'}};
(await fetch(url,opts).then(res=>res.text()).then(eval))();



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

  var ext                   = {};
  ext[Symbol.toStringTag]   = 'ext-code';
                                                                                //console.clear();
                                                                                console.log('ext-code.loader-v1.1');
                                                                                //console.log();
                                                                                
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
        ext.text          = {};
        ext.create        = {};
        create();
        local();
        github();
        
        
        ext.create.repo('code','javascript-2020','ext-code','main');
        ext.create.repo('libs','javascript-2020','libs','main','js/');
        ext.create.repo('nodejs','javascript-2020','code-projects','main','node-js/');
        
        
        //snippets();
        
        
        
        
        return ext;
        
        
        function is(v){
        
              var str       = Object.prototype.toString.call(v);
              str           = str.slice(8,-1);
              var result    = (str==ext[Symbol.toStringTag]);
              return result;
              
        }//is
        
        
        function create(){
        
              ext.create.repo=function(name,owner,repo,branch,def_dir){
                                                                                ext.df && console.log('create',type);
                    var list      = {};
                    
                    
                    var load    = {};
                    
                    load.get=async function(target,prop,text){
                                                                                ext.df && console.log(`load.${name}`,prop);
                          var lname   = prop.split('/');
                          var key     = modproxy.key(lname);
                          
                          if(list[key]){
                                return list[key];
                          }
                          var txt        = await load.text(prop,lname);
                          
                          var value;
                          if(text){
                                value   = txt;
                          }else{
                                value   = define(txt);
                          }
                                                                                ext.df && console.log(`load.${name}`,prop,typeof value);
                          ext[name][key]    = value;
                          return value;
                          
                    }//get
                    
                    load.apply=function(target,thisArg,args,text){
                    
                          return Promise.all(args.map(arg=>load.get(target,arg,text)));
                          
                    }//apply
                    
                    ext.load[name]=new Proxy(()=>{},{
                          get     : (target,prop)=>load.get(target,prop),
                          apply   : (target,thisArg,args)=>load.apply(target,thisArg,args)
                    });
                    
                    ext.text[name]=new Proxy(()=>{},{
                          get   : (target,prop)=>load.get(target,prop,'text'),
                          apply : (target,thisArg,args)=>load.apply(target,thisArg,args,'text')
                    });
                    
                    
                    ext[name] = modproxy(list,notfound);
                    
                    async function notfound(lname,args){
                                                                                ext.df && console.log('notfound',lname);
                          var file          = lname.join('/');
                          var txt           = await load.text(file,lname);
                          
                          var value         = define(fnstr);
                          
                          var key           = modproxy.key(lname);
                          ext[name][key]    = value;
                          
                          if(typeof value!='function'){
                                return value;
                          }
                          
                          var fn        = value;
                          var result    = await fn.apply(null,args);
                          return result;
                          
                    }//notfound
                    
                    
                    load.text=async function(file,lname){
                                                                                ext.df && console.log('load',lname);
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
                          
                          var txt       = await res.text();
                          return txt;
                          
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
              
              load.get=async function(target,prop,text){
                                                                                  ext.df && console.log('load.proxy',prop);
                    if(list[prop]){
                          return list[prop];
                    }
                    
                    var txt   = await load.text(prop,text);
                    
                    var value;
                    if(text){
                          value   = txt;
                    }else{
                          value   = define(txt);
                    }
                    
                    list[prop]    = value;
                    return value;
                    
              }//get
              
              load.apply=function(target,thisArg,args,text){
              
                    return Promise.all(args.map(arg=>load.get(target,arg,text)));
                    
              }//apply
              
              ext.load.github=new Proxy(()=>{},{get:load.get,apply:load.apply});
              
              ext.text.github=new Proxy(()=>{},{
                    get   : (target,prop)=>load.get(target,prop,'text'),
                    apply : (target,thisArg,args)=>load.apply(target,thisArg,args,'text')
              });
              
              
              proxy.get=async function(target,prop){
              
                    cur   = prop;
                    if(list[prop]){
                          return list[prop];
                    }
                    
                    var txt       = await load.text(prop);
                    
                    var value     = define(txt);
                    list[prop]    = value;
                    return value;
                    
              }//get2
              
              proxy.apply=async function(target,thisArg,args){
              
                    var value   = list[cur];
                    
                    if(typeof value!='function'){
                          return value;
                    }
                    
                    var fn        = value;
                    var result    = await fn.apply(thisArg,args);
                    return result;
                    
              }//apply2
              
              ext.github    = new Proxy({},{get:proxy.get,apply:proxy.apply});
              
              
              load.text=async function(prop){
              
                    var {owner,repo,branch,file}    = parse(prop);
                    
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
                    
                    var txt   = await res.text();
                    return txt;
                    
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
              
              
              load.get=function(target,prop,text){
                                                                                  ext.df && console.log('load.local',prop);
                    if(list[prop]){
                          return list[prop];
                    }
                    
                    var txt     = load.text(prop);
                    
                    var value;
                    if(text){
                          value   = txt;
                    }else{
                          value   = define(txt);
                    }
                    
                    list[prop]    = value;
                    return value;
                    
              }//get
              
              load.apply=function(target,thisArg,args,text){
              
                    return args.map(arg=>load.get(target,arg,text));
                    
              }//apply
              
              ext.load.local    = new Proxy(()=>{},{get:load.get,apply:load.apply});
              
              ext.text.local    = new Proxy(()=>{},{
                    get     : (target,prop)=>load.get(target,prop,'text'),
                    apply   : (target,thisArg,args)=>load.apply(target,thisArg,args,'text')
              });
              
              
              proxy.get=function(target,prop){
              
                    cur   = prop;
                    if(list[prop]){
                          return list[prop];
                    }
                    
                    var txt     = load.text(prop);
                    
                    var value   = define(txt);
                    list[prop]  = value;
                    return value;
                    
              }//get
              
              proxy.apply=function(target,thisArg,args){
              
                    var value   = list[cur];
                    
                    if(typeof value!='function'){
                          return value;
                    }
                    
                    var fn        = value;
                    var result    = fn.apply(thisArg,args);
                    return result;
                    
              }//apply
              
              ext.local    = new Proxy({},{get:proxy.get,apply:proxy.apply});
              
              
              load.text=function(file){
                                                                                ext.df && console.log('local.load',file);
                    var txt     = fs.readFileSync(file,'utf8');
                    return txt;
                    
              }//load
              
        }//local
        
  //:
  
        function define(fnstr){
                                                                                  ext.df && console.log('define',fnstr);
              var code    = `
                    (()=>{
                    
                          var fn    = ${fnstr};
                          return fn;
                          
                    })();
              `;
              
              var fn    = eval(code);
                                                                                  ext.df && console.log('define',fn);
              return fn;
              
        }//define
        
  //:
  
        function modproxy(mem,notfound,opts={}){
        
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
                    if(opts.promiseCompat){
                        if(lname=='then'){
                            return null;
                        }
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


