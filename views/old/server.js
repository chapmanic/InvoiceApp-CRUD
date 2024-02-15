const express = require('express')
const app = express()
app.set("view engine", "ejs")


app.get("/", (req, res) => {
    res.render("base", { title: "Home Page", contentFile: "./index.ejs"})
})

app.get("/about", (req, res) => {
    res.render("base", { title: "About Us", contentFile: "./about.ejs"})
})

app.listen(5005)