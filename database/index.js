const sqlite3 = require("sqlite3");

class DataBase {
  constructor(dbFileName) {
    this.db = new sqlite3.Database(dbFileName, (err) => {
    if (err) {
      console.error(err.message);
    }
      console.log('Connected to the e-ventus database.');
    });
    this.createTables();
  }

  createTables(){
    console.log("Creating tables ...");
    this.db.run(`CREATE TABLE IF NOT EXISTS events (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          description TEXT NOT NULL,
          location TEXT NOT NULL,
          place TEXT NOT NULL,
          startDate DATE,
          endDate DATE,
          imageURL TEXT
      );`);
  }

  getAllEvents(){
    return new Promise((resolve, reject) => {
      this.db.all("select * from events;", [], (err, rows) => {
        if (err){
            console.log("Error when getting all events. "+ err.message);
            reject(err);
        }
        resolve(rows);
      });
    });
  } 

  getEvent(eventId){
    return new Promise((resolve, reject) => {
      this.db.get("select * from events where id = ?;", [eventId], (err, row) => {
        if (err){
            console.log("Error when getting all events. "+ err.message);
            reject(err);
          }
        row ? resolve(row) : reject("Event not found");
      });
    });
  }

  insertEvent(name, description, location, place, startDate, endDate, imageURL){
    return new Promise((resolve, reject) => {
      this.db.run(`INSERT INTO events(
        name,
        description,
        location,
        place,
        startDate,
        endDate,
        imageURL
      ) VALUES (?,?,?,?,?,?,?) `, [name,description,location,place,startDate,endDate,imageURL], err => {
          if (err){
            console.log("Error when creating event. "+ err.message);
            reject(err);
          }
          resolve();
        
      });
    });
  }

  updateEvent(id, name, description, location, place, startDate, endDate,imageURL){
    return new Promise((resolve, reject) => {
      this.db.run(`UPDATE events SET
        name = ?,
        description = ?,
        location = ?,
        place = ?,
        startDate = ?,
        endDate = ?,
        imageURL = ?
      where id = ? `, [name,description,location,place,startDate,endDate, imageURL, id], err => {
        if (err){
          console.log("Error when updating event. "+ err.message);
          reject(err);
        }
        resolve();
      });
    });
    
  }

  deleteEvent(eventId){
    return new Promise((resolve, reject) => {
      this.db.run(`DELETE FROM events WHERE id=?`, [eventId], err => {
        if (err){
          console.log("Error when deleting event. "+ err.message);
          reject(err);
        }
        resolve();
      });
    });
    
  }
}

const db = new DataBase("./eventus.db");

module.exports = db;