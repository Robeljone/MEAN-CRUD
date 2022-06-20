const Express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
var fileupload = require("express-fileupload");
var fs = require("fs");
var app = Express();
var MongoClient = require("mongodb").MongoClient;
var CON_Str ="mongodb+srv://admin:admin123@crud.xbe9u.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(CON_Str, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var DataBase = "MEAN";
var database = "";
app.use(bodyParser.json());
app.use(cors());
app.use(fileupload());
app.use('/uploads',Express.static(__dirname+'/uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3080, () => {
  client.connect(
    (error, client) => {
      database = client.db(DataBase);
      console.log('Database Connected Successfull');
    },
    (error) => {
      console.log(error);
    }
  );
});
app.get("/", (req, res) => {
  res.json("Hello World");
});

//api get method fetch all data
app.get('/api/department',(req,res)=>{
    database.collection("Department").find({}).toArray((error,result)=>{
        if(error)
        {
            console.log(error);
        }
        res.json(result);
    })
});


//get data employee api
app.get('/api/employee',(req,res)=>{
  database.collection("Employee").find({}).toArray((error,result)=>{
      if(error)
      {
          console.log(error);
      }
      res.json(result);
  })
});

//api post method insert data
app.post('/api/department',(req,res)=>{
    database.collection("Department").count({}, (error,numOfDocs)=>{
          if(error){
            console.log(error);
          }
        database.collection("Department").insertOne({
            Depid: numOfDocs+1,
            DepartmentName: req.body["DepartmentName"]
        })
        res.json('Data Posted Successfully');
    })
});

//api to update data
app.put('/api/department',(req,res)=>{
    database.collection("Department").updateOne(
        {
          "Depid": req.body["Depid"]
        },
        {
          $set:
          {
            "DepartmentName": req.body["DepartmentName"]
          }
        }
    );
    res.json('Updated Successfully');
});

//api to delete data 
app.delete('/api/department',(req,res)=>
{
    database.collection("Department").deleteOne(
        {
            Depid: parseInt(req.params.Depid)
        }
        );
        res.json("Deleted Successfully");
});

//upload image file to directory with file name 
app.post('/api/employee/saveimage',(req,res)=>
{
   fs.writeFile("./uploads/"+req.files.file.name, req.files.file.data ,function(err){
    if(err)
    {
      console.log(err);
    }
     res.json(req.files.file.name);
   })
});