const express = require('express');
var cors = require('cors')
// logger
const log = require('./logs/logger');
// routes
const patientRouter = require('./routes/patientRoute');
const doctorRouter = require('./routes/doctorRoute');
const diagnosisRouter = require('./routes/diagnosisRoute');
const prescriptionRouter = require('./routes/prescriptionRoute');
const consultationRouter = require('./routes/consultationRoute');
//db
require('./db/db')

const app = express();

// Middle ware
//json
app.use(express.json());
app.use(cors())

//log requests coming to server
app.use((req, res, next) => {
    log(`${req.url} Request Method: ${req.method}`)
    next()
})


app.listen(3030, () => {
    console.log("Running express server on port 3000");
    log("Running express server on port 3000");
})

app.get('/', (req, res) => {
    console.log("User has hit homepage")
    res.json({"msg": "API working..."})
  });

// Routes
app.use("/patient", patientRouter)
app.use("/doctor", doctorRouter)
app.use("/diagnosis", diagnosisRouter)
app.use("/prescription", prescriptionRouter)
app.use("/consultation", consultationRouter)