const express = require("express");
const mainRouter = require("./routes/index")
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.use("/api/v1",mainRouter);


app.listen(3000, () => console.log("Start Server on port no. "+PORT));

