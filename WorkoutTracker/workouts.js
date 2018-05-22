var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars').create({defaultLayout: "main"});
app.use(express.static('public'));

var mysql = require("mysql");
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_carrigaj',
  password        : '0176',
  database        : 'cs290_carrigaj'
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 25445);
//app.use(bodyParser.urlencoded({extended: false}));
//app.use(bodyParser.json());



app.get('/reset-table',function(req,res,next){
    var context = {};
    pool.query("DROP TABLE IF EXISTS workouts", function(err) {
        var createString = "CREATE TABLE workouts("+
        "id INT PRIMARY KEY AUTO_INCREMENT,"+
        "name VARCHAR(255) NOT NULL,"+
        "reps INT,"+
        "weight INT,"+
        "lbs BOOLEAN," +
        "date DATE)";
        pool.query(createString, function(err) {
          context.results = "Table reset";
          res.render('home',context);
        })
    });
});

app.get('/', function(req, res, next) {
    var context = {};
    pool.query('SELECT * FROM workouts', function(err, rows, fields){
        if(err) {
            next(err);
            return;
        }
        
        var parameters = [];
        for (var row in rows) {
            var addRow = {'id': rows[row].id,
                          'name': rows[row].name,
                          'reps': rows[row].reps,
                          'weight': rows[row].weight,
                          'date': rows[row].date};
            if (rows[row].lbs) {
                addRow.unit = "lbs";
            }
            else {
                addRow.unit = "kg";
            }
            
            parameters.push(addRow);
        }
        
        context.results = parameters;
        res.render('home', context);
    })
});

app.get('/insert', function (req,res,next) {
    var context = {};
    pool.query("INSERT into workouts (`name`, `reps`, `weight`, `lbs`, `date`) VALUES (?,?,?,?,?)",
              [req.query.exercise, req.query.reps, req.query.weight, req.query.unit, req.query.date], function(err, result) {
        if(err) {
            next(err);
            return;
        }
        
        context.inserted = result.insertID;
        res.send(JSON.stringify(context));
    });
});

app.get('/update', function (req, res, next) {
    var context = {};
    pool.query('SELECT * FROM `workouts` WHERE id=?', [req.query.id], function(err, rows, fields) {
        if (err) {
            next(err);
            return;
        }
        
        var parameters = [];
        for (var row in rows) {
            var addRow = {'id': rows[row].id,
                          'name': rows[row].name,
                          'reps': rows[row].reps,
                          'weight': rows[row].weight,
                          'lbs': rows[row].lbs,
                          'date': rows[row].date};
            
            parameters.push(addRow);
        }
        
        context.results = parameters[0];
        res.render('update', context);
    });
});

app.get('/updateBack', function(req, res, next) {
    var context = {};
    pool.query("SELECT * FROM `workouts` WHERE id=?", [req.query.id], function (err, results) {
        if(err){
            next(err);
            return;
        }
        
        if (results.length == 1) {
            var curVals = results[0];
            
            if (req.query.unit === "on") {
                req.query.unit = "1";
            }
            else {
                req.query.unit = "0";
            }
            
            pool.query('UPDATE `workouts` SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=?',
                       [req.query.exercise || curVals.name,req.query.reps || curVals.reps, req.query.weight || curVals.weight, req.query.date || curVals.date, req.query.unit, req.query.id], function(err, result) {
                pool.query ('SELECT * FROM `workouts`', function(err, rows, fields){
                    if(err){
                        next(err);
                        return;
                    }
                    
                    var list = [];
                    for (var row in rows) {
                        var changed = {'name': rows[row].name,
                            'weight': rows[row].weight, 
                            'date':rows[row].date, 
                            'id':rows[row].id};
                        if (rows[row].lbs) {
                            changed.lbs = "lbs";
                        }
                        else {
                            changed.kg = "kg";
                        }
                        list.push(changed);
                    }
                    
                    context.results = list[0];
                    res.render('home', context);
                });
            });
        }
        
    });
});

app.get('/delete', function(req, res, next) {
    var context = {};
    pool.query("DELETE FROM `workouts` WHERE id=?", [req.query.id], function (err, result) {
        if (err) {
            next(err);
            return;
        }
        
        res.render('home', context);
    });
});

app.use(function(req,res){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});


























