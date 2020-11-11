var mysql = require("mysql");
var express = require("express");
var path = require("path");
var exphbs = require("express-handlebars");


var app = express();
var PORT = 4000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) { 

  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/wishes", function(req,res){
    //do handlebars templates here 
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM wishes", function(err,data) {
      if (err) throw err;
   
      console.log("wishes are coming true");
      res.render("index",{wishes:data});
      //need to loop through the table and show 
      
    });
   

})
// Create New Characters - takes in JSON input
 app.post("/api/characters", function(req, res) {
  createWish(req.body.name);
}); 

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Ning_thang_om_96",
  database: "wish_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
 /*  createProduct(); */
});






function createWish(name) {
  console.log("Inserting new wish...\n");
  var query = connection.query(
    "INSERT INTO wishes SET ?",
    {
      wish: name,
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " wish inserted!\n");
      // Call updateProduct AFTER the INSERT completes
   /*    updateProduct(); */
    }
  );


  // logs the actual query being run
   
  console.log(query.sql);
}


function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM wishes", function(err,data) {
    if (err) throw err;
 
    
    return data;
  });
  
} 

