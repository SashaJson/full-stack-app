'use strict';

const express = require('express');
const cors = require('cors');
const path = require("path");
const a = express();

a.use(express.json());
a.use(cors());
a.use(express.static(path.resolve(__dirname, "client")));

const app = require('./app')(a);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server has been run on port: ${PORT}`))