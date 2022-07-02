const sql = require("../GlobalConfig.js");
// constructor
class Tutorial {
  constructor(tutorial) {
    this.title = tutorial.title;
    this.description = tutorial.description;
    this.published = tutorial.published;
  }
  static create(newTutorial, result) {
    sql.query("INSERT INTO tutorials SET ?", newTutorial, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created tutorial: ", { id: res.insertId, ...newTutorial });
      result(null, { id: res.insertId, ...newTutorial });
    });
  }
  static findById(id, result) {
    sql.query(`SELECT * FROM tutorials WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found tutorial: ", res[0]);
        result(null, res[0]);
        return;
      }
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
    });
  }
  static getAll(title, result) {
    let query = "SELECT * FROM tutorials";
    if (title) {
      query += ` WHERE title LIKE '%${title}%'`;
    }
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("tutorials: ", res);
      result(null, res);
    });
  }
  static getAllPublished(result) {
    sql.query("SELECT * FROM tutorials WHERE Published=true", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("tutorials: ", res);
      result(null, res);
    });
  }
  static updateById(id, tutorial, result) {
    sql.query(
      "UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?",
      [tutorial.title, tutorial.description, tutorial.published, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          // not found Tutorial with the id
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("updated tutorial: ", { id: id, ...tutorial });
        result(null, { id: id, ...tutorial });
      }
    );
  }
  static remove(id, result) {
    sql.query("DELETE FROM tutorials WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("deleted tutorial with id: ", id);
      result(null, res);
    });
  }
  static removeAll(result) {
    sql.query("DELETE FROM tutorials", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(`deleted ${res.affectedRows} tutorials`);
      result(null, res);
    });
  }
}
module.exports = Tutorial;