const express = require('express');
const router = express.Router();

router.use("/", require("./index"));
router.use("/404", require("./404"));
router.use("/api", require("./api"));
router.use("/widgets", require("./widgets"));

module.exports = router;