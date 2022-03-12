"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var express = require("express");
var cors = require("cors");
var path = require("path");
var port = 3000;
var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    res.status(200).sendFile(path.join(__dirname, 'dist/index.html'));
});
app.get('/test', function (req, res) {
    res.status(200).json('backend working');
});
//404 error handler
app.use('*', function (req, res) {
    res.sendStatus(404);
});
//global error handler
app.use(function (err, req, res, next) {
    var defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: { err: 'An error occurred' }
    };
    var errorObj = __assign(__assign({}, defaultErr), err);
    console.log(err);
    return res.status(errorObj.status).json(errorObj.message);
});
app.listen(port, function () { return console.log("Server running on port ".concat(port)); });
exports["default"] = app;
