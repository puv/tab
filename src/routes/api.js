const { Router } = require("express");
const db = require("../database/database");
require("moment-duration-format");

const router = Router();

router.get("/widgets", async (req, res) => {
    id = req.query.id;
    if (!id) return res.sendStatus(401);
    tab = await db.getTab(id);
    if (!tab) return res.sendStatus(404);

    return res.json(tab.widgets);
});

router.post("/widgets", async (req, res) => {
    id = req.body.id;
    if (!id) return res.sendStatus(401);
    tab = await db.getTab(id);
    if (!tab) return res.sendStatus(404);
    await db.updateTab(id, JSON.parse(req.body.widgets));

    return res.sendStatus(200);
});
module.exports = router;