const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    product: { type: String },
    amount: { type: Number },
    sales_team: { type: String },
})

const Invoice = mongoose.model("Invoices", userSchema);

module.exports = Invoice