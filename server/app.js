const express = require('express');
const morgan = require('morgan');

const app = express();

// add your code here
const bodyParser = require("body-parser");

app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const mockData = [
  {
    todoItemId: 0,
    name: "an item",
    priority: 3,
    completed: false,
  },
  {
    todoItemId: 1,
    name: "another item",
    priority: 2,
    completed: false,
  },
  {
    todoItemId: 2,
    name: "a done item",
    priority: 1,
    completed: true,
  },
];

const router = express.Router();
app.use("/", router);

router
  .route('/')
  .get((req, res, next) => {
    res.status(200).send({ status: "ok" });
  })

router
  .route("/api/TodoItems")
  .get((req, res, next) => {
    res.status(200).send(mockData);
  })
  .post((req, res, next) => {
    res.status(201).send(req.body);
  });

router
.route("/api/TodoItems/:number")
.get((req, res, next) => {
  let todoItem = {};
  for (let i = 0; i < mockData.length; i++) {
    if (parseInt(req.params.number) === mockData[i].todoItemId) {
      todoItem = mockData[i];
    }
  }
  res.status(200).send(todoItem);
})
.delete((req, res, next) => {
  let deleted = {};
  for (let i = 0; i < mockData.length; i++) {
    if (parseInt(req.params.number) === mockData[i].todoItemId) {
      deleted = mockData[i];
      mockData.splice(i, 1);
    }
   }
   res.status(200).send(deleted);
});

module.exports = app;
