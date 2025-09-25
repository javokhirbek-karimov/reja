const http = require("http");
const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;

let db;
const connectionString =
  "mongodb+srv://KHAN:BpTpn9yosjSXkLrZ@cluster0.amiiidi.mongodb.net/Reja?retryWrites=true&w=majority&appName=Cluster0";

mongodb.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) console.log("Error on connection MongoDB");
    else {
      const app = require("./app");
      console.log("MongoDB connection succeed");
      module.exports = client;

      const server = http.createServer(app);
      let PORT = 3000;
      server.listen(PORT, function () {
        console.log(
          `The server is running successfully on port: ${PORT}, http://localhost:${PORT}`
        );
      });
    }
  }
);
