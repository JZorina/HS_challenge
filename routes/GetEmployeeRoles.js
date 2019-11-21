var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    var id =req.query.employeeId;

    req.getConnection(function(error, conn) {
      if(error)
        console.log(error);
      
      conn.query('SELECT e.RoleId, r.description FROM employeeroles e INNER JOIN roles as r on r.id=e.RoleId where e.EmployeeId=?',[id],function(err, rows, fields) {
        if (err) 
          res.send({'success':false,'message':'Could not connect to db'});
      
        else 
        {
          ret = JSON.stringify(rows);
          if(rows.length===0)
            res.send({'success':true,'message':'no user matching this id'});
          else
            res.send({'success':true,'message':'Success','payload':ret});
         // res.send(ret);
        }
      })
    })
});

module.exports = router;
