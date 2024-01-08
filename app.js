const express = require("express");
const app = express();
app.use(express.json()); //IN-BUILT MIDDLEWARE FUNCTION

const format = require("date-fns/format");
const isMatch = require("date-fns/isMatch");
const isValid = require("date-fns/isValid");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

let db = null;

const path = require("path");
const dbPath = path.join(__dirname, "todoApplication.db");

const initializeDataBase = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Sever Running");
    });
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
};
initializeDataBase();

//-----Has only status---------
const hasOnlyStatus = (query) => {
  return query.status !== undefined;
};

//-------Has only priority--------
const hasOnlyPriority = (query) => {
  return query.priority !== undefined;
};

//---------Has both status && priority-----
const hasStatusAndPriority = (query) => {
  return query.status !== undefined && query.priority !== undefined;
};

//-------Has only search Query---------------
const hasOnlySearchQuery = (query) => {
  return query.search_q !== undefined;
};

//---------Has both category && status--------
const hasCategoryAndStatus = (query) => {
  return query.status !== undefined && query.category !== undefined;
};

//----------Has only category------------------
const hasOnlyCategory = (query) => {
  return query.category !== undefined;
};

//-----------Has Both category && priority--------
const hasCategoryAndPriority = (query) => {
  return query.category !== undefined && query.priority !== undefined;
};

//-----------Convert Keys---------------
const out = (obj) => {
  return {
    id: obj.id,
    todo: obj.todo,
    priority: obj.priority,
    status: obj.status,
    category: obj.category,
    dueDate: obj.due_date,
  };
};
//------------API-1--------------------
app.get("/todos/", async (request, response) => {
  let data = null;
  let getQuery = "";
  const { status, priority, search_q = " ", category } = request.query;
  switch (true) {
    //----------scenario-5--------------
    case hasCategoryAndStatus(request.query):
      let con1 =
        status === "TO DO" || status === "DONE" || status === "IN PROGRESS";
      let con2 =
        category === "WORK" || category === "HOME" || category === "LEARNING";
      if (con2) {
        if (con1) {
          getQuery = `SELECT * FROM todo WHERE status='${status}' AND category='${category}';`;
          data = await db.all(getQuery);
          response.send(data.map((obj) => out(obj)));
        } else {
          response.status(400);
          response.send("Invalid Todo Status");
        }
      } else {
        response.status(400);
        response.send("Invalid Todo Category");
      }
      break;

    //--------------scenario-7-----------------
    case hasCategoryAndPriority(request.query):
      let c1 =
        category === "WORK" || category === "HOME" || category === "LEARNING";
      let c2 =
        priority === "HIGH" || priority === "MEDIUM" || priority === "LOW";
      if (c1) {
        if (c2) {
          getQuery = `SELECT * FROM todo WHERE category='${category}' AND priority='${priority}';`;
          data = await db.all(getQuery);
          response.send(data.map((obj) => out(obj)));
        } else {
          response.status(400);
          response.send("Invalid Todo Priority");
        }
      } else {
        response.status(400);
        response.send("Invalid Todo Category");
      }
      break;

    //--------------scenario-3-----------
    case hasStatusAndPriority(request.query):
      let cond1 =
        status === "TO DO" || status === "DONE" || status === "IN PROGRESS";
      let cond2 =
        priority === "HIGH" || priority === "MEDIUM" || priority === "LOW";
      if (cond1) {
        if (cond2) {
          getQuery = `SELECT * FROM todo WHERE status='${status}' AND priority='${priority}';`;
          data = await db.all(getQuery);
          response.send(data.map((obj) => out(obj)));
        } else {
          response.status(400);
          response.send("Invalid Todo Priority");
        }
      } else {
        response.status(400);
        response.send("Invalid Todo Status");
      }
      break;

    //----------scenario-1----------------
    case hasOnlyStatus(request.query):
      if (status === "TO DO" || status === "DONE" || status === "IN PROGRESS") {
        //write api
        getQuery = `SELECT * FROM todo WHERE status='${status}';`;
        data = await db.all(getQuery);
        response.send(data.map((obj) => out(obj)));
      } else {
        response.status(400);
        response.send("Invalid Todo Status");
      }
      break;

    //-----------scenario-2-------------
    case hasOnlyPriority(request.query):
      if (priority === "HIGH" || priority === "MEDIUM" || priority === "LOW") {
        //write api
        getQuery = `SELECT * FROM todo WHERE priority='${priority}';`;
        data = await db.all(getQuery);
        response.send(data.map((obj) => out(obj)));
      } else {
        response.status(400);
        response.send("Invalid Todo Priority");
      }
      break;

    //----------scenario-4------------
    case hasOnlySearchQuery(request.query):
      getQuery = `SELECT * FROM todo WHERE todo LIKE '%${search_q}%';`;
      data = await db.all(getQuery);
      response.send(data.map((obj) => out(obj)));
      break;

    //--------------scenario-6------------
    case hasOnlyCategory(request.query):
      let con =
        category === "WORK" || category === "HOME" || category === "LEARNING";
      if (con) {
        getQuery = `SELECT * FROM todo WHERE category='${category}';`;
        data = await db.all(getQuery);
        response.send(data.map((obj) => out(obj)));
      } else {
        response.status(400);
        response.send("Invalid Todo Category");
      }
      break;

    //-------------DEFAULT CASE------------------
    default:
      getQuery = `SELECT * FROM todo`;
      data = await db.all(getQuery);
      response.send(getQuery.map((obj) => out(obj)));
      break;
  }
});

//-----------API-2-------------------
app.get("/todos/:todoId/", async (request, response) => {
  const { todoId } = request.params;
  const getQuery = `SELECT * FROM todo WHERE id=${todoId};`;
  const data = await db.get(getQuery);
  response.send(out(data));
});

//------------API-3----------------
app.get("/agenda/", async (request, response) => {
  const { date } = request.query;
  if (isMatch(date, "yyyy-MM-dd")) {
    const newDate = format(new Date(date), "yyyy-MM-dd");
    const getQuery = `SELECT * FROM todo WHERE due_date='${newDate}';`;
    const data = await db.all(getQuery);
    response.send(data.map((obj) => out(obj)));
  } else {
    response.status(400);
    response.send("Invalid Due Date");
  }
});

//------------API-4----------------
app.post("/todos/", async (request, response) => {
  const { id, todo, priority, status, category, dueDate } = request.body;
  let con =
    category === "WORK" || category === "HOME" || category === "LEARNING";
  if (con) {
    //---Priority-Check-----
    if (priority === "HIGH" || priority === "MEDIUM" || priority === "LOW") {
      //------Status-Check----
      if (status === "TO DO" || status === "DONE" || status === "IN PROGRESS") {
        //---Due Date Check ------------
        if (isMatch(dueDate, "yyyy-MM-dd")) {
          const newDate = format(new Date(dueDate), "yyyy-MM-dd");
          const getQuery = `INSERT INTO todo(id,todo,priority,status,category,due_date) VALUES(${id},'${todo}','
                        ${priority}','${status}','${category}','${dueDate}')`;
          await db.run(getQuery);
          response.send("Todo Successfully Added");
        } else {
          response.status(400);
          response.send("Invalid Due Date");
        }
      } else {
        response.status(400);
        response.send("Invalid Todo Status");
      }
    } else {
      response.status(400);
      response.send("Invalid Todo Priority");
    }
  } else {
    response.status(400);
    response.send("Invalid Todo Category");
  }
});

//-----API-5-------
app.put("/todos/:todoId/", async (request, response) => {
  const { todoId } = request.params;
  const { status, priority, category, todo, dueDate } = request.body;
  let q = "";
  let msg = "";
  switch (true) {
    //-------scenario-1--------
    case status !== undefined:
      if (status === "TO DO" || status === "DONE" || status === "IN PROGRESS") {
        q = `UPDATE todo SET status='${status}' WHERE id=${todoId};`;
        msg = "Status Updated";
      } else {
        response.status(400);
        response.send("Invalid Todo Status");
      }
      break;

    //-------scenario-2--------
    case priority !== undefined:
      if (priority === "HIGH" || priority === "MEDIUM" || priority === "LOW") {
        q = `UPDATE todo SET priority='${priority}' WHERE id=${todoId};`;
        msg = "Priority Updated";
      } else {
        response.status(400);
        response.send("Invalid Todo Priority");
      }
      break;

    //-------scenario-3--------
    case todo !== undefined:
      q = `UPDATE todo SET todo='${todo}' WHERE id=${todoId};`;
      msg = "Todo Updated";
      break;

    //-------scenario-4--------
    case category !== undefined:
      if (
        category === "WORK" ||
        category === "HOME" ||
        category === "LEARNING"
      ) {
        q = `UPDATE todo SET category='${category}' WHERE id=${todoId};`;
        msg = "Category Updated";
      } else {
        response.status(400);
        response.send("Invalid Todo Category");
      }
      break;

    //-------scenario-5--------
    case dueDate !== undefined:
      if (isMatch(dueDate, "yyyy-MM-dd")) {
        const newDate = format(new Date(dueDate), "yyyy-MM-dd");
        q = `UPDATE todo SET due_date='${newDate}' WHERE id=${todoId};`;
        msg = "Due Date Updated";
      } else {
        response.status(400);
        response.send("Invalid Due Date");
      }
      break;
  } //out of switch block
  await db.run(q);
  response.send(msg);
});

//-----API-6------
app.delete("/todos/:todoId/", async (request, response) => {
  const { todoId } = request.params;
  const q = `DELETE FROM todo WHERE id=${todoId};`;
  await db.run(q);
  response.send("Todo Deleted");
});

module.exports = app;
