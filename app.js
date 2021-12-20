const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());
let db;
const mongoclient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

mongoclient.connect(url, function (err, client) {
    if (err) {
        console.log("erreur")
    }
    console.log("connection à mongodb");
    db = client.db("animaux");
})

app.get('/', function (req, res) {
    fs.readFile('index.html', function (err, html) {
        console.log(html);
        res.write(html);
        res.end();
    });
})

app.post('/add_article', function (req, res) {
    console.log(req.body);
    bdd.createarticles('articles', req.body, function () {
        res.redirect('/');
    });
})

app.get("/listAnimaux", (req, res) => {
    db.collection('creche').find({}).toArray(function (err, docs) {
        res.json(docs)
    })
})

app.post('/insertAnimal', function (req, res, ) {
    try {
        db.collection("creche").insertOne(
            req.body
        )
    } catch (err) {
        req.json({
            req: err
        })
    }
})

app.get("/listUnAnimalParLeNom/:nom", (req, res) => {
    db.collection('creche').find({
        name: req.params.nom
    }).toArray(function (err, docs) {
        res.json(docs)
    })
})

app.post('/modifAnimal', function (req, res, ) {
    console.log(req);
    try {
        db.collection("creche").updateOne({
                name: req.body.nom
            },
            req.body
        )
    } catch (err) {
        req.json({
            req: err
        })
    }
})

app.listen(8080, () => console.log("port 8080"))