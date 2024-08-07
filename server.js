const express = require("express");
const appRoute = require("./routes/route.js");

const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

/** ROUTES */

app.use("/api", appRoute);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});
