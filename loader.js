//fetch('https://raw.githubusercontent.com/javascript-2020/ext-code/main/loader.js').then(res=>res.text().then(eval));


(()=>{


  var ext           = {};
  globalThis.ext    = ext;

  remote_functions();
  remote_snippets();

  
  function remote_functions(){
                                                                          console.log('remove_functions');
        var gistid    = 'c97d8ccff5908e2dcb30fc82e3af5454';
        var list      = {};
        
        
        var defer=new Proxy({},{get:(target,prop)=>{
                                                                          //console.log('defer.proxy',prop);
              if(list[prop])return;
              load(gistid,list,prop);
              
        }});
        
        
        ext.fn = new Proxy({},{get:(target,prop)=>{
        
              if(list[prop]){
                    return list[prop];
              }
              
              if(prop==='defer'){
                    return defer;
              }
              
              return async(...args)=>{
                                                                          //console.log('ext.fn',prop,datatype(list[prop]));
                    var promise=new Promise(async resolve=>{
                    
                          var fn          = await load(gistid,list,prop);
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
        
  }//remote_functions
  
  
  function remote_snippets(){
  }//remove_snippets
  
  
  async function load(gistid,list,prop){
                                                                    //console.log('load',prop);
        var res   = await fetch(`https://gist.githubusercontent.com/javascript-2020/${gistid}/raw/`+prop);
        if(!res.ok){
              console.log('failed to load remote-function:'+prop);
              return '[ not found '+prop+' ]';
        }
        
        var fnstr       = await res.text();
                                                                    console.log(fnstr);
        var fn          = eval('var fn='+fnstr+';fn');
                                                                    console.log(fn);
        list[prop]      = fn;
        return fn;
        
  }//load
  
  
})();



