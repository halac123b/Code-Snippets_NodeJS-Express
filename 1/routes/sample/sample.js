const express = require("express");

// Create new Router object to handle request
const router = express.Router();

router.get("/sample/", (request, response) => {
    response.render("sample/index", {title: "Sample Home"});
});

router.get("/sample/dev", (request, response) => {
    response.render("sample/dev", {title: "Sample Dev"});
});

module.exports = router;