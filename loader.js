//  fetch('https://raw.githubusercontent.com/javascript-2020/ext-code/main/loader.js').then(res=>res.text().then(eval));


(()=>{


      var ext           = {};
      globalThis.ext    = ext;
      
      remote_functions();
      remote_snippets();
      
      
      function remote_functions(){
                                                                              console.log('remote_functions');
            var owner     = 'javascript-2020';
            var repo      = 'ext-code';
            var branch    = 'main';
            
            var list      = {};
            
            
            ext.defer=new Proxy(()=>{},{get,apply});
            
            function get(target,prop){
                                                                              //console.log('defer.proxy',prop);
                  if(list[prop])return;
                  return load('fn',prop);
                  
            }//get
            
            function apply(target,thisArg,args){
            
                  return args.map(arg=>get(target,arg));
                  
            }//apply
            
            
            ext.fn = new Proxy({},{get:(target,prop)=>{
            
                  if(list[prop]){
                        return list[prop];
                  }
                  
                  return async(...args)=>{
                                                                              //console.log('ext.fn',prop,datatype(list[prop]));
                        var promise=new Promise(async resolve=>{
                        
                              var fn          = await load('fn',prop);
                              if(typeof fn!='function'){
                                    resolve(fn);
                                    return;
                              }
                              var result      = await fn(...args);
                              resolve(result);
                              
                        });
                        return promise;
                        
                  };
                  
            }});
            
            async function load(type,file){
                                                                                      //console.log('load',file);
                  var url   = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${type}/${file}`;
                  var res   = await fetch(url);
                  if(!res.ok){
                        console.log('failed to load remote-function: '+file);
                        return '[ not found '+file+' ]';
                  }
                  
                  var fnstr       = await res.text();
                                                                                      //console.log(fnstr);
                  var fn          = eval('var fn='+fnstr+';fn');
                                                                                      //console.log(fn);
                  list[file]      = fn;
                  return fn;
                  
            }//load
            
      }//remote_functions
      
      
      function remote_snippets(){
      }//remove_snippets
      
      
})();
