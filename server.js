const Express =  require("express")
const App = Express()
const {exec} = require("node:child_process")
const mysql = require("mysql2")
const session = require("express-session")
const bycrypt = require("bcrypt")
const jsobwebtoken = require("jsonwebtoken")
const SaltRounds = 10

App.use(Express.json())
App.use(Express.static("Scripts"))


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "password", // replace with your root password
    database: 'notesapp'  // we'll create this next
})

db.connect((err)=> {

    if(err) {
        console.log("ERROR!")
    }else {
        console.log("Connected to mysql!")
    }


}   )



App.post("/CreateNote",(req,res) => {



})



App.post("/Login",(req,res) => {
    const {Username,Password} = req.body

    db.query("SELECT * FROM users WHERE username = ?",[Username],async(err,results)=> {


        if (err) {
            res.json({message : "Error occured"})
            return
        }

        if (results.length == 0) {
            res.json({message : "User does not exist!"})
            return
        }


        User = results[0]


        Compare = bycrypt.compareSync(Password,User.password)


        if (Compare){
            res.json({message : "Login Successful!"})
        }else {
            res.json({message : "Password was incorrect!"})
        }






    })
})


App.post("/CreateAccount",(req,res) => {
    const {Username,Password} = req.body

    db.query("SELECT * FROM users WHERE username = ?",[Username],async(err,results)=> {

        if (err) {
            res.json({message : "Error occured"})
            return
        }

        if (results.length > 0) {
            res.json({message : "Username has been taken!"})
            return
        }


        const HashPassword = bycrypt.hashSync(Password,SaltRounds)


        db.query("INSERT INTO users (username,password,created_at) VALUES(?,?,NOW()) ",[Username,HashPassword],async(err,results) => {
        if (err) {
            res.json({message : "Error occured"})
            return
        }


        res.json({message : "Account succesfully created!"})




        })



    })
})




App.listen(3000,() =>console.log("Connected to local host 3000"),exec("start http://localhost:3000"))
