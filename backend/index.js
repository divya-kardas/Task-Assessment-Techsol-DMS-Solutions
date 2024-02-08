const connectToMongo = require("./db");
connectToMongo();
const express = require("express");
const app = express();
const port = 5000;
var cors =require('cors')
app.use(cors())

app.use(express.json()); //if you want to use the request body you need to write this line
//Available rountes
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use("/api/auth", require("./routes/auth"));

app.listen(port, () => {
  console.log(`Shopping backend app listening on port ${port}`);
});
