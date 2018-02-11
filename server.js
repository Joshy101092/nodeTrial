const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
var app = express();
const port = process.env.PORT || 3000;


hbs.registerPartials(__dirname+"/views/partials");
app.set("view engine", "hbs");


app.use((req, res, next) => {
    var no = new Date().toString();
    
    var log = `${no}: ${req.method} and ${req.url}`;
    fs.appendFileSync("text.txt", log);
    console.log('server.log',log+"\\n");
    next();
});

app.use((req, res, next) => {
    res.render("maintenance.hbs", {
        pageTitle: "Maintenance page"
    });
    next();
});

app.use(express.static(__dirname+"/public"));

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
    next();
});

app.get("/about",(req,res) =>{
    res.render("about.hbs", {
        pageTitle: "About page"
    });
});







app.listen(port, () =>{
    console.log(`Server up on socket ${port}`);
});