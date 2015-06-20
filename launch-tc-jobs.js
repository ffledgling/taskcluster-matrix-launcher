"use strict";
var taskcluster = require('taskcluster-client');
var exec = require('child_process').exec;
var jobinfo = require('./job-info');

var queue = new taskcluster.Queue({
    timeout: 30*1000,
    credentials: {
        clientId: process.env.TC_CLIENT_ID,
        accessToken: process.env.TC_ACCESS_TOKEN,
    }
});


var count = 0;

var generatePayload = function(matrix, payload) {
    // I might not really need the payload object here...
    // Javascript closures are hard

    if(Object.keys(matrix).length === 0) {
        console.log('Count: ' + count++);
       // console.log(payload);
       console.log();
    }

    var attr = Object.keys(matrix)[0];
    var values = matrix[attr];

    for (var v in values) {
        delete matrix[attr];
        console.log(attr + ": " + v);
        payload.payload[attr] = v;
        generatePayload(matrix, payload);
        matrix[attr]=values;
    }

    return;
}

//generatePayload(jobinfo.matrix, jobinfo.payload);
var getTimestamp = function(offset) {
    // Attempt to use GNU date
    exec('date -u -d ' + offset + '+%FT%X.%3NZ', function(error, stdout, stderr) {
        if(error !== null) {
            console.log('Attempting to use non-GNU date');
            exec("date -u +%FT%X.%3NZ", function(error, stdout, stderr) {
                if(error !==null) {
                    console.log(stderr);
                    throw new Error('Could not generate timestamp for payload');
                } else {
                    console.log(stdout);
                    return stdout;
                }
            });
        }
        else {
            console.log(stdout);
            return stdout;
        }
    });
}
var getCreatedTimestamp = function() {
    return getTimestamp(0);

var getDeadlineTimestamp = function() {
    return getTimestamp(jobinfo.deadline);
}
