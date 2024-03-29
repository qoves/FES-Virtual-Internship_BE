const auth = require("./Auth");
const analysis = require("./Analysis");
const LogicalAnalysis = require("./LogicalAnalysis");
const Payment = require("./Payment");
const Custmization = require("./Custmization");
const Summary = require("./Summary");
const Docs = require("./docs");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send(`<h1>Hey Developer!!!</h1>`);
  });
  app.use("/api/auth", auth);
  app.use("/api/data", analysis);
  app.use("/api/logical", LogicalAnalysis);
  app.use("/api/pay", Payment);
  app.use("/api/custmization", Custmization);
  app.use("/api/res", Summary);
  app.use("/docs", Docs);
};
