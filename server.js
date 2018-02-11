const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
var app = express();

hbs.registerPartials(__dirname+"/views/partials");
app.set("view engine", "hbs");
app.use(express.static(__dirname+"/public"));

app.use((req, res, next) => {
    var no = new Date().toString();
    
    var log = `${no}: ${req.method} and ${req.url}`;
    fs.appendFileSync("text.txt", log);
    console.log('server.log',log+"\\n");
    next();
});


hbs.registerHelper("getCurrentYear",() => {
    return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
    return text.toUpperCase();
});


app.get("/",(req, res) => {

    //res.send("<h1>Hello Express!</h1>");
    res.render("home.hbs", {
        pageTitle: "Home page"
        });
});

app.get("/about",(req,res) =>{
    res.render("about.hbs", {
        pageTitle: "About page"
    });
});





app.listen(3000, () =>{
    console.log("Server up on socket 3000");
});