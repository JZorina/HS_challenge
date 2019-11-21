var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {

    var id =req.body.employeeId;
    var roleid =req.body.roleId;
    var date = new Date().toISOString().match(/(\d{2}:){2}\d{2}/)[0]

    req.getConnection(function(error, conn) {
        if(error)
            console.log(error);
        
        conn.query('INSERT INTO attendance (employeeId,roleid,actionTime) VALUES (?,?,?)',[id,roleid,date]
        ,function(err, rows, fields) {
        if (err) 
            res.send({'success':false,'message':'Could not connect to db'});
        else 
            res.send({'success':true,'message':'Data saves successfully'});
    });
  })
});
module.exports = router;
