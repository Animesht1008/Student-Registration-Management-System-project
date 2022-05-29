var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dbmsproject"
})

let createtable=`create table if not exists student(
    email varchar(255) primary key,
    pass varchar(255) not null,
    college varchar(255) not null,
    city varchar(255) not null,
    dob varchar(255) not null,
    name varchar(255) not null,
    mob varchar(255) not null

)`

con.connect((err) => {
    if (err) {
        console.log("connection failed")
    }

})
con.query(createtable,(err)=>{
    if(err) { throw err }
    console.log("table created")
})


function register(req, res) {
    console.log(req)
    let email = req.body.email
    let pass = req.body.pass
    let sql = `insert into student(email,pass) values ('${email}','${pass}')`
    let sql1 = `select * from student where email='${email}'`
    console.log(sql)
    con.query(sql1, (err, res1) => {
        if (err) {
            res.send({ "res": "error1 occured" })
        }
        else {
            console.log(res1.length)
            if (res1.length === 0) {
                console.log(sql)
                con.query(sql, (err, result) => {
                    if (err) {
                        //throw err
                        res.send({ "res": "error occured" })
                    }
                    else {
                        console.log(result)
                        if (result.affectedRows === 1) {
                            res.send({ "res": "registration successful", "email": email })
                        }
                        else {
                            res.send({ "res": "incorrect registration credential" })
                        }
                    }
                })
            }
            else
            {
                res.send({"res":"email already exist"})
            }
        }

    })


}
function login(req, res) {
    console.log(req)
    let email = req.body.email
    let pass = req.body.pass
    let sql = `SELECT * from student WHERE email='${email}' && pass='${pass}'`
    console.log(sql)
    con.query(sql, (err, result) => {
        if (err) {
            throw err
            //res.send({"res":"error occured"})
        }
        else {
            console.log(result.length)
            if (result.length === 1) {
                res.send({ "res": "login successful", "email": email })
            }
            else {
                res.send({ "res": "incorrect login credential" })
            }
        }
    })
}

/* GET home page. */
function fetch(req, res) {
    con.query('select email, name, college, city, dob, mob from student where 1=1', (err, result) => {
        if (err) {
            throw err
            //res.send({"res":"error occured"})
        }
        else {
            console.log(result)
            res.send({ "res": result })
        }
    })
}

function update(req, res) {
    let email = req.body.email
    let s="set "
    if(req.body.college!=="")
    {
        s=s+` college='${req.body.college}',`
    }
    if(req.body.name!=="")
    {
        s=s+` name='${req.body.name}',`
    }
    if(req.body.city!=="")
    {
        s=s+` city='${req.body.city}',`
    }
    if(req.body.mob!=="")
    {
        s=s+` mob='${req.body.mob}',`
    }
    if(req.body.dob!=="")
    {
        s=s+` dob='${req.body.dob}',`
    }
    s=s.substr(0,s.length-1)
    let sql='update student '
    sql=sql+s
    sql=sql+` where email='${email}'`
    console.log(sql)
    con.query(sql,(err,result)=>{
        if(err)
        {
            throw err
        }
        console.log(result)
        res.send({"res":"updated"})
    })

}
function Delete(email,res){
    con.query(`delete from student where email='${email}'`,(err,result)=>{
        if(err){
            throw err
        }
        console.log(result)
        res.send({"res":"account deleted"})
    })
}

router.post('/login', function (req, res, _next) {
    login(req, res)

});
router.post('/register', function (req, res, _next) {
    register(req, res)
})
router.post('/fetch', function (req, res, _next) {
    fetch(req, res)

})
router.post('/update', function (req, res, _next) {
    update(req,res)

})
router.post('/delete',(req,res,_next)=>{
    Delete(req.body.email,res)
})

module.exports = router;
