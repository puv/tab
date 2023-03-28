const { Router } = require("express");
const db = require("../database/database");
require("moment-duration-format");

const router = Router();

router.get("/:type", async (req, res) => {
    const type = req.params.type;
    const params = req.query;
    return res.render(`widgets/${type}`, {
        params: params
    })
});

module.exports = router;