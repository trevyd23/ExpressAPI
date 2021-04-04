const { Router } = require("express");
const userInfo = require('./userInfo.json');

const router = new Router();

router.get("/user-info", (req, res) => {
    res.json(userInfo);
});

module.exports = router;