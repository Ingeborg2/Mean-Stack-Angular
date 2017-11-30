const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const gemsSchema = new Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    forSale: Boolean,
    soldOut: Boolean,
    sparkle: { type: String, required: true },
    createdBy: { type: String },
    createdOn: { type: Date, default: Date.now() },
    updatedOn: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Gems', gemsSchema);