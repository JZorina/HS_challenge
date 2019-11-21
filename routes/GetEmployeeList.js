var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    req.getConnection(function(error, conn) {
      if(error)
        console.log(error);

      conn.query('SELECT Id,name FROM Employees',function(err, rows, fields) {
        if (err) 
          res.send({'success':false,'message':'Could not connect to db'});
      
        else 
        {
          ret = JSON.stringify(rows);
          res.send({'success':true,'message':'Success','payload':ret});
        }
      })
    })
});

module.exports = router;
