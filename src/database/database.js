const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Tab = require("./models/Tab");
const ObjectId = mongoose.Types.ObjectId;

dotenv.config();

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};


const db = {
    init: async (callback) => {
        console.log("Initializing Database");

        let instance = await mongoose.connect(process.env.DB_URI, options);
        _db = instance.connection.db;
        console.log("Database Initialized");

        if (_db.listCollections({ name: 'tabs' }).hasNext()) {
            console.log("Collection TABS exists");
        } else {
            console.log("Collection TABS does not exist");

            const tab = new Tab();

            tab.save(function (error) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Tab created successfully!');
                }
            });
        }

        let tabCount = await Tab.countDocuments();
        console.log("Table TABS Loaded: " + tabCount + " results");
        return _db;
    },
    createTab: async (id) => {
        if (await db.getTab(id)) return null;
        const tab = new Tab();
        tab._id = id;
        tab.save();
        return tab;
    },
    getTab: async (id) => {
        const tab = await Tab.findOne({ _id: id });
        if (!tab) return null;
        return tab;
    },
    updateTab: async (id, data) => {
        if (!await db.getTab(id)) return null;
        const tab = await Tab.updateOne({ _id: id }, { widgets: data });
        return tab;
    }
}

module.exports = db;