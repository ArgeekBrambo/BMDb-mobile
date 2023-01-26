const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes');


app
    .use(cors())
    .use(morgan('tiny'))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use('/', router)
    .listen(port, () => console.log(`Listening on port ${port} orchestrator`));

