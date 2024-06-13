//  fetch('https://raw.githubusercontent.com/javascript-2020/ext-code/main/loader.js').then(res=>res.text().then(eval));


(()=>{


      var ext           = {};

      ext.defer         = {};

      create('fn','javascript-2020','ext-code','main');
      create('libs','javascript-2020','libs','main');

      
      //remote_snippets();
      
      
      function create(type,owner,repo,branch){
                                                                                console.log('create',type);
            var list      = {};

            
            ext.defer[type]=new Proxy(()=>{},{get,apply});
            
            async function get(target,prop){
                                                                                //console.log('defer.proxy',prop);
                  var lname   = prop.replaceAll('/','.');
                  if(list[lname])return;
                  var fn        = await load(lname);
                  list[lname]   = fn;
                  
            }//get
            
            function apply(target,thisArg,args){
            
                  return args.map(arg=>get(target,arg));
                  
            }//apply
            
            
            ext[type] = modproxy(list,notfound);

            async function notfound(lname,args){
            
                  var fn        = await load(lname);
                  var result    = fn.apply(null,args);
                  return result;
                  
            }//notfound

            
            async function load(lname){
                                                                                console.log('load',lname);
                  var file    = lname.replaceAll('.','/');
                  var url     = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${file}`;
                  var res     = await fetch(url);
                  if(!res.ok){
                        console.log('failed to load remote-function: '+file);
                        return '[ not found '+file+' ]';
                  }
                  
                  var fnstr       = await res.text();
                                                                                //console.log(fnstr);
                  var fn          = eval('var fn='+fnstr+';fn');
                                                                                //console.log(fn);
                  list[lname]     = fn;
                  return fn;
                  
            }//load
            
      }//fn
      
      
      function remote_snippets(){
      }//remove_snippets
      
      
      function modproxy(mem,notfound){
      
            return newproxy();
            
            
            function getter(target,name,receiver,lname){
            
                  lname  += '.'+name;
                  return newproxy(()=>{},lname);
                  
            }//getter
            
            
            function setter(target,name,newval,lname){
            
                  lname  += '.'+name;
                  lname   = lname.slice(1);
                                                                                console.log(`wt : ${lname} - ${newval}`);
                  mem[lname]    = newval;
                  
            }//setter
            
            
            function applyer(target,thisArg,args,lname){
            
                  lname   = lname.slice(1);
                  
                  if(lname in mem){
                        var v   = mem[lname];
                        if(typeof v==='function'){
                                                                                console.log(`fn : ${lname} - [${args}]`);
                              return v.apply(thisArg,args);
                        }
                        return v;
                  }
                  
                  return notfound(lname,args);
                                                                                console.log(`fn (not found): ${lname} - [${args}]`);
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
     
      return ext;
      
})();



