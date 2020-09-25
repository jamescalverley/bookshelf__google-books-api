const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.get('/', (req,res) => {
  res.send("google books api")
});

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`)
});