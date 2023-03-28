const { Router } = require("express");

const router = Router();

router.get("/", async (req, res) => {
    res.render("404");
})

module.exports = router;