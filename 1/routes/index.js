const express = require("express");

// Create new Router object to handle request
const router = express.Router();

const usersJson = "./database/users.json";

const fs = require("fs");
const bodyParser = require("body-parser");
const { parse } = require("path");

// Tùy vào path hiện tại mà thực hiện hàm tương ứng
router.get("/", (request, response) => {
    response.render("pages/index", {title: "Home"});
});

// Khi access vào link này thay vì hiện ra webcontent thì server sẽ gửi về 1 file
router.get("/listUsers", (request, response) => {
    response.sendFile(usersJson, {root: "."});
});

router.get("/list", (request, response) => {
    response.render("pages/list", {title: "Users"});
});

router.post("/listSingle", bodyParser.json(), (request, response) => {
    // Thay vì gửi cả file như trên thì đọc file và lọc data cần thiết sau đó mới gửi đi
    fs.readFile(usersJson, "utf8", (err, data) => {
        let users = JSON.parse(data);
        let result = users.filter((user) =>  {
            // Filter user có id được yêu cầu
            if (user.id == request.body.id){
                return user;
            }
            else {
                return false;
            }
        });
        response.json(result);
    });
});

// :id -> giá trị bất kì
router.get("/user/:id", (request, response) => {
    response.render("pages/view", {title: "View Profile"});
});

router.get("/add-user", (request, response) => {
    response.render("pages/add-user", {title: "Add New User"});
})

router.post("/addUser", bodyParser.json(), (request, response) => {
    // Get list data từ file
    let users = JSON.parse(fs.readFileSync(usersJson, "utf8"));

    let userLength = parseInt(users.length + 1);
    
    // Create a new user profile, then push to list, and write into file data
    let user = {
        id: userLength,
        name: request.body.name,
        phone: request.body.phone,
        password: request.body.password
    };
    users.push(user);
    fs.writeFileSync(usersJson, JSON.stringify(users));

    return response.redirect("/list");
});

router.get("/edit-user/:id", (request, response) => {
    response.render("pages/edit-user", {title: "Edit User"});
})

router.post("/editUser", bodyParser.json(), (request, response) => {
    // Get list data từ file
    let users = JSON.parse(fs.readFileSync(usersJson, "utf8"));

    // Loop array và update user có id tương ứng
    for (var i = 0; i < users.length; i++){
        console.log(users[i].id);
        if (users[i].id == request.body.id){
            users[i].name = request.body.name;
            users[i].phone = request.body.phone;
            users[i].password = request.body.password;
            break;
        }
    }
    // Overwrite data file
    fs.writeFileSync(usersJson, JSON.stringify(users));

    return response.redirect("/list");
});

router.get("/delete-user/:id", (request, response) => {
    fs.readFile(usersJson, "utf8", (err, data) => {
        let users = JSON.parse(data);

        // Filter và delete user
        users.filter((user) => {
            if (user.id === parseInt(request.params.id)){
                users.splice(users.indexOf(user), 1);
                fs.writeFileSync(usersJson, JSON.stringify(users));

                return response.redirect("/list");
            }
            else {
                return false;
            }
        })
    })
})

module.exports = router;
