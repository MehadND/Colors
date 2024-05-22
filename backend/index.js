const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const data = require("./public/colors.json");

const app = express();
const PORT = 5100;

app.use(express.static(__dirname + "/public"));
app.use(cors());
app.use(express.json());

app.get("/api/colors/", (req, res) => {
  logToConsole(req.method, req.url);

  res.status(200).json(data);
});

app.post("/api/colors/", async (req, res) => {
  logToConsole(req.method, req.url);

  // Get the data from the request body
  const body = req.body;

  const newColor = {
    id: body.id,
    color: body.color,
    value: body.value,
  };

  data.push(newColor);
  writeToFile(data);
  res.status(201).json(data);
});

app.delete("/api/colors/:id", (req, res) => {
  logToConsole(req.method, req.url);

  const colorID = req.params.id;
  const index = data.findIndex((color) => color.id == colorID);

  if (index !== -1) {
    data.splice(index, 1);
    writeToFile(data);
    res.status(200).json(data);
  } else {
    res.status(404).send("Post not found");
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

/**
 * A function that takes a data object and writes it to a file
 * @param {*} data Accepts data object (JSON object) that needs to be written to file
 */
const writeToFile = (data) => {
  try {
    fs.writeFileSync(
      path.join(__dirname, "/public", "colors.json"),
      JSON.stringify(data)
    );
  } catch (error) {
    console.error(error);
  }
};

/**
 * A method that logs a information abouta request to the console
 * @param {*} method Method of the request (GET, POST, DELETE, etc)
 * @param {*} url URL/Endpoint of the request
 */
const logToConsole = (method, url) => {
  console.log(`${method} - ${url}`);
};
