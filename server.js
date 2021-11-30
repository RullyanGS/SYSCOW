const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
app = express();

const cors = require("cors") // importing the `cors` package
app.use(cors()) // tells Express to use `cors`, and solves the issue

app.use(serveStatic(path.join(__dirname, 'dist')));
const port = process.env.PORT || 3000;
app.listen(port);

