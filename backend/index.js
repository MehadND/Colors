const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const data = require("./public/colors.json");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5100;

app.use(express.static(__dirname + "/public"));
app.use(cors());
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const username = "MehadND"; //only checking user login credentials via hardcoded.

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

app.put("/api/colors/", (req, res) => {
  logToConsole(req.method, req.url);

  const colorID = req.body.id;

  console.log("ID that was passed = " + colorID);

  const index = data.findIndex((color) => color.id == colorID);

  if (index !== -1) {
    const body = req.body;

    const editColor = {
      id: body.id,
      color: body.color,
      value: body.hex,
    };

    data[index] = editColor;
    writeToFile(data);
    // data[index].color = req.body.color;
    // data[index].value = req.body.hex;
    // writeToFile(data);
    res.status(200).json(data);
  } else {
    res.status(404).send("Color not found");
  }
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
    res.status(404).send("Color not found");
  }
});

// Login Routing

app.post("/login", (req, res) => {
  if (req.body.username === username) {
    logToConsole(
      req.method,
      req.url,
      req.body.username + " login was successful..."
    );
    res.status(201).send({ success: true });
  } else {
    logToConsole(
      req.method,
      req.url,
      "'" + req.body.username + "' tried to login but failed..."
    );
    res.status(201).send({ success: false });
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
    // fs.writeFileSync(
    //   path.join(__dirname, "/public", "colors.json"),
    //   JSON.stringify(data)
    // );
    fs.createWriteStream(path.join(__dirname, "/public", "colors.json")).write(
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
const logToConsole = (method, url, message) => {
  if (url === "/login") {
    console.log(`${method} - ${url} - user ${message}`);
  } else {
    console.log(`${method} - ${url}`);
  }
};
