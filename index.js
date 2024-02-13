const express = require('express')
require('dotenv').config();
const recipe = require('./data.js')
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
app.use(bodyParser.json())
app.use(express.json())
app.use(cors());
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello to recepie Api')
})
app.get('/getAll', (req, res) => {
  res.status(200).json({ success: true, data: recipe })
})
app.get('/getA', (req, res) => {
  const { title } = req.query;

  const data = recipe.find(item => item.title.toLowerCase() === title.toLocaleLowerCase());
  if (data) {
    res.status(200).json({ success: true, data: data });
  } else {
    console.log(`Recipe not found for title: ${title}`);
    res.status(404).json({ success: false, message: "Recipe not found" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});