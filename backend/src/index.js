//imports express package (installed via npm on modules folder)
const express = require('express');

//Security Module - Can be configured to only allow a single domain to access this backend
const cors = require('cors');

/*  imports var routes from routes.js containing all routes from that file
    imported as = './' ('./' meaning same folder, '../' meaning up one directory)
*/
 const routes = require('./routes');

//application inherits express package module
const app = express();

app.use(cors());

//needed to recognize json data from body
app.use(express.json());

//tells the app to use the imported var routes
app.use(routes);           

//run app (loops indefinitly listening for requests)
app.listen(3333);