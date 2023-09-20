// Package http cần để tạo server
const http = require("http")

// Câu lệnh tạo server
http.createServer((request, response) => {
    // Tạo header cho response, kèm status code
    response.writeHead(200, {"Content-Type": "text/plain"});
    // Kết thúc 1 response
    response.end("Hello");
}).listen(8081);    // Open server listen at port 8081