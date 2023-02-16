const express = require('express');
// path
const path = require('path');
// db
const db = require('./config');
// body-parser
const bodyParser = require('body-parser');
// port
const port = parseInt(process.env.port) || 4000;
// Express app
const app = express();
// Router
const route = express.Router();
app.use(
    route,
    express.json,
    bodyParser.urlencoded({extended: false}),
)

route.get('/', (req, res)=>{
    res.status(200).sendFile(path.join(__dirname, './view/index.html'));
})
route.get('/reservations', (req,res)=>{
    const strQry =
    `SELECT clientID,clientName, clientSurname, bookingDate, tableNumber
    FROM reservations;
    `;
    // db
    db.query(strQry, (err, data)=>{
        if(err) throw err;
        res.status(200).json( {result:data});
    })
});
route.post('/add',bodyParser.json(), (req, res)=>{
    let detail = req.body;
    // sql query
    const strQry =
    `INSERT INTO reservations
    SET ?;`;
    db.query(strQry, [detail], (err)=> {
        if(err) {
            res.status(400).json({err});
        }else {
            res.status(200).json({msg: "The client reservation is successfully recorded."})
        }
    })
})
app.listen(port, ()=>{
    console.log(`Server is running at ${port}`);
})