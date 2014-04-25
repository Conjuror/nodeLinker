#!/usr/bin/env node

var exec = require('child_process').exec,
  child;

var dataSet, dataResult;

// A very basic web server in node.js
// Stolen from: Node.js for Front-End Developers by Garann Means (p. 9-10)

// web server
var port = 8000;
var serverUrl = "127.0.0.1";

var http = require("http");
var path = require("path");
var fs = require("fs");
var qs = require("querystring");

var account = "admin";
var password = "letmein";
var authed = false;
/***
 * Server
 ***/
server = http.createServer(function(req, res) {

  var now = new Date();
  if (req.method == 'POST') {
    var content = '';
    req.on('data', function(data) {
      content += data;
    });
    req.on('end', function() {
      postData = qs.parse(decodeURIComponent(content));
      procPOST(postData);
      res.statusCode = 202;
      res.end();
    });
  }
  else {
    var filename = req.url.split("?")[0] || "index.html";
    var ext = path.extname(filename);
    var localPath = __dirname;
    var validExtensions = {
      ".html": "text/html",
      ".js": "application/javascript",
      ".css": "text/css",
      ".txt": "text/plain",
      ".jpg": "image/jpeg",
      ".gif": "image/gif",
      ".png": "image/png",
      ".ico": "image/ico"
    };
    var isValidExt = validExtensions[ext];

    if (isValidExt) {
      localPath += filename;
      path.exists(localPath, function(exists) {
        if (exists) {
          console.log("Serving file: " + localPath);
          getFile(localPath, res, isValidExt);
        } else {
          console.log("File not found: " + localPath);
          res.writeHead(404);
          res.end();
        }
      });
    }
    else {
      console.log("Invalid file extension detected: " + ext);
    }
  }
}).listen(port, serverUrl);

function getFile(localPath, res, mimeType) {
  fs.readFile(localPath, function(err, contents) {
    if (!err) {
      res.setHeader("Content-Length", contents.length);
      res.setHeader("Content-Type", mimeType);
      res.statusCode = 200;
      res.end(contents);
    } else {
      res.writeHead(500);
      res.end();
    }
  });
}

var originData = [];
var userData = [];

fs.readFile('js/data.js', function(err, contents) {
  if (!err) {
    originData = JSON.parse(contents.slice(12));
  } else {
    console.log("Cannot load data.js: " + err);
  }
});
fs.readFile('js/user.js', function(err, contents) {
  if (!err) {
    userData = JSON.parse(contents.slice(12));
  } else {
    console.log("Cannot load user.js: " + err);
  }
});

function procPOST(data) {
  if (authed == true && data['action'] == 'saveGraph') {
    console.log("save graph position");
    fs.writeFile("js/init_user_data.js", "var nodes = " + data['nodes'], function (err) {}); 
  } else if (authed == true && data['action'] == 'new') {
    newLink = validNewLink(data);
    if (newLink != null) {
      console.log("Add new links");
      originData.push(newLink);
      fs.writeFile("js/data.js", "var links = " + JSON.stringify(originData), function (err) {}); 
    }
  } else if (authed == true && data['action'] == 'update') {
    for (i = 0 ; i < originData.length ; i++) {
      if (originData[i]['source'] == data['source'] &&
          originData[i]['target'] == data['target']) {
        console.log("Update Link: " + i);
        originData[i]['relationship'] = data['relationship'];
        originData[i]['revrel'] = data['revrel'];
        fs.writeFile("js/data.js", "var links = " + JSON.stringify(originData), function (err) {}); 
        break;
      }
    }
  } else if (authed == true && data['action'] == 'remove') {
    for (i = 0 ; i < originData.length ; i++) {
      if (originData[i]['source'] == data['source'] &&
          originData[i]['target'] == data['target']) {
        console.log("Remove Link: " + i);
        originData.splice(i, 1);
        fs.writeFile("js/data.js", "var links = " + JSON.stringify(originData), function (err) {}); 
        break;
      }
    }
  } else if (data['action'] == 'logout') {
    console.log("unauthed");
    authed = false;
  } else if (data['action'] == 'login') {
    if (data['account'] == account &&
        data['password'] == password) {
      console.log("authed");
      authed = true;
    }
  } else if (data['action'] == 'log') {
    console.log("User Logout: " + data['user'] + ' ' + data['counter'] + ' ' + data['time']/6000);
    for (i = 0 ; i < userData.length ; i++) {
      if (userData[i]['name'] == data['user']) {
        userData[i]['counter'] += data['counter'];
        userData[i]['time'] += data['time'];
        fs.writeFile("js/user.js", "var users = " + JSON.stringify(userData), function (err) {});
        break;
      }
    }
  } else if (data['action'] == 'addUser') {
    console.log("Add user: " + data['name']);
    userData.push({'name': data['name'], 'counter': 0, 'time': 0});
    fs.writeFile("js/user.js", "var users = " + JSON.stringify(userData), function (err) {});
  } else if (data['action'] == 'editUser') {
    for (i = 0 ; i < userData.length ; i++) {
      if (userData[i]['name'] == data['name']) {
        console.log("edit user: " + data['name']);
        userData[i]['counter'] = data['counter'];
        userData[i]['time'] = data['time'];
        fs.writeFile("js/user.js", "var users = " + JSON.stringify(userData), function (err) {});
        break;
      }
    }
  } else if (data['action'] == 'delUser') {
    for (i = 0 ; i < userData.length ; i++) {
      if (userData[i]['name'] == data['user']) {
        console.log("Delete user: " + data['name']);
        userData.splice(i, 1);
        fs.writeFile("js/user.js", "var users = " + JSON.stringify(userData), function (err) {});
        break;
      }
    }
  }
}

function getMyId() {
  test = 0;
  for (var i = 0 ; i < originData.length ; i++) {
    if (test < originData[i]['id'])
      test = originData[i]['id'];
  }
  return test + 1;
}

function validNewLink(data) {
  result = null;
  if (data['source'] != '' &&
      data['target'] != '' &&
      data['type'] != '' &&
      data['relationship'] != '' &&
      data['revrel'] != '') {
    result = {};
    result['source'] = data['source'];
    result['target'] = data['target'];
    result['type'] = data['type'];
    result['relationship'] = data['relationship'];
    result['revrel'] = data['revrel'];
    result['id'] = getMyId();
  }
  return result;
}
