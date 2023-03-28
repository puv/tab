const mongoose = require('mongoose');

const tabSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    widgets: { type: Array, required: true, default: [] },
});

const Tab = mongoose.model('Tab', tabSchema);

module.exports = Tab;