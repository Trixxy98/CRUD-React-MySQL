import express from 'express'; //express ialah web framework yang digunakan bersama Node.js untuk membina aplikasi backend dan API dengan lebih mudah dan tersusun.
import mysql2 from 'mysql2';
import cors from 'cors';

const app = express();
const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "root1234",
    database: "test"
})

app.use(express.json()); //express.json() ialah middleware yang digunakan untuk memproses data yang dikirimkan dari client ke server.
app.use(cors()); //cors() ialah middleware yang digunakan untuk memperbolehkan permintaan dari domain yang berbeda.

app.get("/", (req,res)=>{
    res.json("Hello World");
})

app.get("/books", (req,res)=>{
    const q = "SELECT * FROM books";
    db.query(q, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data);
    })
})

app.post("/books", (req,res)=>{
    const q = "INSERT INTO books (`title`, `decs`,`cover`) VALUES (?)";
    const values = 
    [req.body.title, 
        req.body.decs, 
        req.body.cover];
    db.query(q, [values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Books has been created successfully");
    })
})

app.listen(8800, ()=>  {
    console.log("Connected to backend!");
})