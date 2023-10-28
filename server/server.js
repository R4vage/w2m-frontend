const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");
const router = jsonServer.router(path.join(__dirname, "db.json")); // your json data file
const middlewares = jsonServer.defaults();
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:4200",
  exposedHeaders: ["X-Total-Count"],
};

server.use((req, res, next) => {
  const oldSend = res.send;

  res.send = function (data) {
    const jsonData = JSON.parse(data);

    const newResponse = {
      data: jsonData,
      totalCount: Number(res.getHeader("X-Total-Count")),
    };

    oldSend.call(res, JSON.stringify(newResponse));
  };

  next();
});

server.use(middlewares);

server.use(cors(corsOptions));

server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running on port 3000");
});
