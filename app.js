const express= require('express');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');

const app= express();

let items= ['Buy Food','Eat Food','Cook Food'];
let workItems=[];

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

mongoose.connect("mongodb+srv://ssilva22:<password>@cluster0.30ueh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority/todolistDB", {useNewUrlParser: true});

const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Welcome to your todolist!"
});

const item2 = new Item({
    name: `Hit the + button to add a new item`
});

const item3 = new Item({
    name:  `<--Hit this to delete an item."`
});

const defaultItems=[item1,item2,item3];

Item.insertMany(defaultItems , function(err){

    if(err){
        console.log(err);
    }else{
       console.log("Successfully saved default items to database") ;
    }
});

app.get("/", function(req, res){
   const today= new Date();
   const currentDay= today.getDay();

   const options= {
       weekday: "long",
       day: "numeric",
       month: "long",
   };
   
   let day= today.toLocaleDateString("en-US",options);

    

   res.render('list', {listTitle: day, newListItems: items});
});

app.post("/", function(req, res){
    let item= req.body.newItem;

    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }

});

app.get("/work", function(req,res){
    res.render("list",{listTitle: "Work List" , newListItems: workItems});
});

app.post("/work" , function(req,res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work")
})

app.get("/about", function(req, res){
    res.render("about");
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
});















///////////////////////////////////////////////////////
//////////////////////////////////////////////////////
/*switch(currentDay){
      case 0:
      day="Sunday";
      break;
      case 1:
      day="Monday";
      break;
      case 2:
      day="Tuesday";
      break;
      case 3:
      day="Wednesday";
      break;
      case 4:
      day="Thursday";
      break;
      case 5:
      day="Friday";
      break;
      case 6:
      day="Saturday";
      break;
      default:
      console.log(`error current day is equal to ${currentDay}`);
    }*/