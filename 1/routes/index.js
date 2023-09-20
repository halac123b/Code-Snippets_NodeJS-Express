const express = require("express");

// Create new Router object to handle request
const router = express.Router();

// Tùy vào path hiện tại mà thực hiện hàm tương ứng
router.get("/", (request, response) => {
    response.render("pages/index", {title: "Home"});
});

module.exports = router;
