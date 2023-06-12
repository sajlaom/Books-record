const { error } = require('console')
var express = require('express')
var mysql = require('mysql')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()

//we can parse a data from user in two forms:-
//json parser
  var jsonParser = bodyParser.json
  app.use(jsonParser());
//url encoded parser
   var urlEncodedParser = bodyParser.urlencoded({extended:false})  


var con = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password : 'Saju@1996',
    database : 'newbooks_db'
})

con.connect((err)=>{
    if(err) throw err;
    console.log('connected to database');
})

//now we have to perform a CRUD operation with these books:-
    //list of books(get)
    //create new book(post)
    //update a book(put/patch)
    //delete a book(delete)

//list of books(get)
app.get('/books',(req,res)=>{
  con.query('select * from newbooks',(err,result,field)=>{
    if(err) throw (err);
    res.send(result);
  })
})    

//get a single book
app.get('/book/:id',(req,res)=>{

  let  id = req.params.id;       //the id which is passed as a paramtr in request is loaded to a variable
   con.query('select * from newbooks where id ='+id , (err,result,field)=>{
    if(err) throw (err);
    res.send(result);
   })
})

//post a book
app.post('/books',(req,res)=>{

    let book_title = req.body.book_title;    //to receive the incoming details of newly posted book from user
    let description = req.body.description;
    let author_name = req.body.author_name;
    let price = req.body.price;
   
//insert query to insert them into database 
    let qr = `INSERT INTO newbooks(book_title,description,author_name,price) values('${book_title}','${description}','${author_name}',${price})`

    con.query(qr,(err,result)=>{
        if(err){
            console.log(err)
            res.send({error:"operation failed"})
        }else{
            res.send({success: "operation successfull"})
        }
    })
})

//update a book
app.put('/book',(req,res)=>{
  
    let book_title = req.body.book_title;    //to receive the incoming details of book from user whch is to updated
    let description = req.body.description;
    let author_name = req.body.author_name;
    let price = req.body.price;
    let id = req.body.id;

    let qr = `UPDATE newbooks SET book_title = '${book_title}', description = '${description}', author_name = '${author_name}', price = ${price} where id = ${id}`

    con.query(qr,(err,result)=>{
        if(err){
            console.log(err)
            res.send({error:"updation failed"})
        }else{
            res.send({success:"updation successfull"})
        }
    })
})

//delete a book
app.delete('/book/:id',(req,res)=>{
    
    let id = req.params.id;
    let qr = `delete from newbooks where id = ${id}`

    con.query(qr,(err,result)=>{
        if(err){
            res.send({error:"deletion failed"})
        }else{
            res.send({success:"record deleted"})
        }
    })
})

app.use(cors());

app.get('/',(req,res)=>{
res.send("<h1>welcome to home page</h1>")      //jsx--> html in js is written so
})

app.listen(9000,()=>{
    console.log('server listening');
})


