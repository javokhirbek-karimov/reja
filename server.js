const http = require("http");
const mongodb = require("mongodb");

let db;
const connectionString =
  "mongodb+srv://KHAN:A-wh638_As_2y_a@cluster0.xztb2in.mongodb.net/Reja";

mongodb.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) console.log("ERROR on connection MongoDB");
    else {
      console.log("MongoDB connection succeed");
      module.exports = client;

      const app = require("./app");
      const server = http.createServer(app);
      let PORT = 3000;
      server.listen(PORT, function () {
        console.log(
          `The sever is running successfully on port: ${PORT}, http://localhost:${PORT}`
        );
      });
    }
  }
);
