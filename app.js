const express= require('express');
const mongoose= require('mongoose');
const bodyParser= require('body-parser');


const app= express();



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true},{useUnifiedTopology:true});

const itemsSchema= {
    name: String,
};

const Item= mongoose.model("Item",itemsSchema);

const item1= new Item({
    name: "Welcome to your to-do list"
});

const item2= new Item({
    name: "Hit the + button to add a new item."
});

const item3= new Item({
    name: "<-- Hit this to delete an item."
});

const defaultItems= [item1,item2,item3];
/*
Item.insertMany(defaultItems, function(err){
    if(err){
        console.log(err)
    }else{
        console.log("Items have been successfully added")
    }
});
*/


app.get("/", function(req, res){
   const today= new Date();
   const currentDay= today.getDay();

   const options= {
    weekday: "long",
    day: "numeric",
    month: "long",
};

let day= today.toLocaleDateString("en-US",options);

   Item.find({}, function(err,foundItems){
       if(foundItems.length === 0){
        Item.insertMany(defaultItems, function(err){
            if(err){
                console.log(err)
            }else{
                console.log("Items have been successfully added")
            }
        })
        res.redirect("/");
       }else{
           res.render('list', {listTitle: day, newListItems: foundItems});
           }
   });

});

app.post("/", function(req, res){
    const itemName= req.body.newItem;

    const item = new Item({
        name: itemName
    })
    item.save()
    res.redirect("/");
});

app.post("/delete", function(req,res){
const checkedItemId= req.body.checkbox;
console.log(checkedItemId)

Item.findByIdAndRemove(checkedItemId, function(err){
    if(!err){
        console.log("Items have been successfully deleted");
        res.redirect("/");
    }
})
});

app.get("/work", function(req,res){
    res.render("list",{listTitle: "Work List" , newListItems: foundItems});
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