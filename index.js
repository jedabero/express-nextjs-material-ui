const express = require("express");
const next = require("next");

const { NODE_ENV, PORT = 8080 } = process.env;

const nextApp = next({ dev: NODE_ENV !== "prod" });
const nextHandle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const router = express.Router();

  const app = express();

  app.use("/api", router);

  app.get("*", (req, res) => nextHandle(req, res));
  app.listen(PORT, err => {
    if (err) throw err;
    console.log(`Server listening on port ${PORT}!`);
  });
}).catch(ex => {
  console.error(ex.stack);
  process.exit(1);
});