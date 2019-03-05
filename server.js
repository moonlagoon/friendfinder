var bodyParser = require("body-parser");
var express = require("express");

var app = express(); // create express server
var PORT = process.env.PORT || 7000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
	type: "application/vnd.api+json"
}));

require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

app.listen(PORT, function () {
	console.log("Listening on port: " + PORT);
});