require('dotenv').config();
// Import Express, Creating App Object & Port variable
const express = require("express");
const app = express();
const port = process.env.PORT;

// Import Middleware
const path = require("path");
const cors = require("cors");
var morgan = require("morgan");

// Import Mongoose module
const mongoose = require("mongoose");

// Import Models
const User = require("./models/User");
const Invoice = require("./models/Invoice");
const { error } = require("console");

// connect to a DB (MongoDB), Use mongoose; calling UserDB as the DB
const db_url = process.env.DB_URL
mongoose
  .connect(db_url)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Using The App Object; allow JSON, url POST requests, cors and EJS
app.use(express.json());
app.use(express.static("public"));
// extended: true provides more flexibility in how data can be structured in form submissions.
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.set("view engine", "ejs");

// Index Route, async -----------------------------------------------------------
app.get("/", async (req, res) => {
  try {
    const invoice_data = await Invoice.find();
    res.render("homef", { invoices: invoice_data });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching users");
  }
});

// Create an invoice ------------------------------------------------------------
app.post("/add-invoice", async (req, res) => {
  // Destructuring form data from req.body
  const { product, amount, sales_team } = req.body;
  try {
    // Create a new invoice document/object using name's from post
    const newInvoice = new Invoice({
      product,
      amount,
      sales_team,
      // Add other fields if necessary according to your Invoice model schema
    });
    // Save to DB (Which is referenced on line 22 /UserDB (doc))
    await newInvoice.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error add invoice to DB");
  }
});

// Update an invoice -------------------------------------------------------------
app.post("/update-invoice/:id", async (req, res) => {
  // This route form uses "invoice-update.js"
  // Create const for ID of invoice and invoice data for form
  const { id } = req.params;
  const { product, amount, sales_team } = req.body;
  try {
    // Use params ID to find and replace data in model format
    await Invoice.findByIdAndUpdate(id, {
      product,
      amount,
      sales_team,
    });
    res.redirect("/");
  } catch (error) {
    console.error(error);
    console.log(500).send("Error updating invoice in DB");
  }
});

// Delete an Invoice ----------------------------------------------------------------
app.post("/delete-invoice/:id", async (req, res) => {
  // Uses invoice-update.js script
  const { id } = req.params;
  try {
    // deleteOne passing ID as an object
    await Invoice.deleteOne({ _id: id});
    res.redirect("/")
  } catch (error) {
    console.error(error)
    console.log(500).send("Error Deleting invoice")
  }
});

// search DB for invoices -----------------------------------------------------------
app.get("/search-invoices", async (req, res) => {
  try {
    const searchQuery = req.query.query; // Grabs search query from URL
    const regex = new RegExp(searchQuery, "i") // RegExp match text, "i" = case insensitive
    const invoiceResults = await Invoice.find({
      $or: [
        { product: regex },
        { sales_team: regex },
        // Add other field to search e.g. { sales_team: regex }
      ]
    });
    // Render index but with search data
    res.render("homef", { invoices: invoiceResults });
  } catch (error) {
    console.error(error)
    res.status(500).send("Error performing search");
  }
});

// App server serve -------------------------------------------*********************
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});