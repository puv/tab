const { Router } = require("express");
const db = require("../database/database");
require("moment-duration-format");

const router = Router();


router.get("/", async (req, res) => {
    id = req.query.id;
    if (!id) return res.render("pages/index");
    tab = await db.getTab(id);
    if (!tab) return res.render("pages/index");

    res.render("pages/tab", {
        id: id
    });
})

router.get("/new", async (req, res) => {
    id = Math.random().toString(36).substring(2, 18);

    tab = await db.createTab(id);


    res.redirect("/?id=" + id);
});

module.exports = router;