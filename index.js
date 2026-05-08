const dotenv = require("dotenv");

dotenv.config();


const app = require("./src/app");

const main = require("./src/config/db");

const matchRoutes = require("./src/routes/matchroutes");

main();

// routes
app.use("/api", matchRoutes);

// server
app.listen(3000, () => {
    console.log("server is running on port 3000");
});