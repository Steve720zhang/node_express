var mysql = require('mysql');  
      
var TEST_DATABASE = 'zzq';  
var TEST_TABLE = 'zzqtable';  
  
//创建连接  
var client = mysql.createConnection({  
  host: '127.0.0.1',
  user: 'root',  
  password: '123456',  
  database: 'zzq'
});

client.connect();
client.query("use " + TEST_DATABASE);

client.query(  
  'SELECT * FROM '+TEST_TABLE,  
  function selectCb(err, results, fields) {  
    if (err) {  
      throw err;  
    }  
      
      if(results)
      {
          for(var i = 0; i < results.length; i++)
          {
              console.log("%d\t%s\t%s", results[i].id, results[i].name, results[i].age);
          }
      }    
    client.end();  
  }  
); 