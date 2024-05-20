
function download_all(){

        var fs      = require('fs');
        var https   = require('https');
        
        var url     = 'https://localhost:3000/';
        var opts    = {rejectUnauthorized:false};
        var https   = require('https');
        
        https.get(`${url}download-list`,opts,async res=>{
        
        			var body    = '';
        			for await(data of res)body   += data;
        			var json    = JSON.parse(body);
        			json.files.forEach(file=>{console.log(file);
        			
                    https.get(`${url}download?${file}`,opts,res=>{
                      
                          var fd    = fs.createWriteStream(file);
                          res.pipe(fd);
                    			
                    });
        			      
        			});
        			
        });

}
