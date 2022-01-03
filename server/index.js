/**
 *
 * index.js
 * (server)
 */

const http = require("http");
const app = require("./app");

const server = http.createServer(app);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log("Server fired at: ", port);
});
