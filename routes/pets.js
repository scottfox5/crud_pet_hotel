var express = require("express");
var router = express.Router();

var pg = require("pg");

var config = { database: "pet_motel" };

// initialize connection Pool
// think of as 'how I connect to DB'

var pool = new pg.Pool(config);

router.get("/", function(req, res) {

  pool.connect(function(err, client, done) {
    if (err) {
      console.log("Error connecting to DB", err);
      res.sendStatus(500);
      done();
    } else {
      // no error occurred, time to query
      // 1. sql string - the actual SQL query we want to running
      // 2. callback - function to run after the database gives us our result
      //               takes an error object and the result object as it's args
      client.query("SELECT * FROM owners JOIN pets ON owners.id = pets.owner_id;", function(err, result) {
        done();
        if (err) {
          console.log("Error querying DB", err);
          res.sendStatus(500);
        } else {
          console.log("Got info from DB", result.rows);
          res.send(result.rows);
        }
      });
    }
  });
});

router.post("/", function(req, res) {
  console.log('pet', req.body);
  pool.connect(function(err, client, done) {
    if (err) {
      console.log("Error connecting to DB", err);
      res.sendStatus(500);
      done();
    } else {
      client.query(
        "INSERT INTO pets (name, breed, color,owner_id) VALUES ($1, $2, $3, $4) RETURNING *;",
        [req.body.name, req.body.breed, req.body.color, req.body.id],
        function(err, result) {
          done();
          if (err) {
            console.log("Error querying DB", err);
            res.sendStatus(500);
          } else {
            console.log("Got info from DB", result.rows);
            res.send(result.rows);
          }
        }
      );
    }
  });
});

router.put('/:id', function(req, res){
  pool.connect(function(err, client, done){
    if (err) {
      console.log('Error connecting to DB', err);
      res.sendStatus(500);
      done();
    } else {
      client.query('UPDATE pets SET name=$2, breed=$3, color=$4 WHERE id = $1 RETURNING *',
                   [req.params.id, req.body.name, req.body.breed, req.body.color],
                   function(err, result){
                     done();
                     if (err) {
                       console.log('Error updating pet', err);
                       res.sendStatus(500);
                     } else {
                       res.send(result.rows);
                     }
                   });
    }
  });
})

router.delete('/:id', function(req, res){
  pool.connect(function(err, client, done){
    if (err) {
      console.log('Error connecting to DB', err);
      res.sendStatus(500);
      done();
    } else {
      client.query('DELETE FROM pets WHERE id = $1',
                   [req.params.id],
                   function(err, result){
                     done();
                     if (err) {
                       console.log('Error deleting pet', err);
                       res.sendStatus(500);
                     } else {
                       res.sendStatus(204);
                     }
                   });
    }
  });
});















module.exports = router;
