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

var getTimestamp = function(offset) {
    // Attempt to use GNU date
    var timestamp = null;
    console.log('date -u -d ' + offset + ' +%FT%X.%3NZ');
    exec('date -u -d ' + offset + ' +%FT%X.%3NZ', function(error, stdout, stderr) {
        if(error !== null) {
            console.log(stderr);
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
    return getTimestamp('now');
};

var getDeadlineTimestamp = function() {
    return getTimestamp(jobinfo.deadline);
};

var generatePayload = function(matrix, payload) {
    // I might not really need the payload object here...
    // Javascript closures are hard

    if(Object.keys(matrix).length === 0) {
        // Finished applying one set from the matrix
        console.log('Count: ' + count++);
        payload.created = getCreatedTimestamp();
        payload.deadline = getDeadlineTimestamp();
        console.log(payload);
        console.log();
    }

    // Get an attribute we handle in this function
    var attr = Object.keys(matrix)[0];

    // Values for that attr
    var values = matrix[attr];

    for (var v in values) {
        delete matrix[attr];

        console.log(attr + ": " + v);
        payload.payload[attr] = v;
        generatePayload(matrix, payload);

        // Nasty hack to deal with Javascript object behaviour
        matrix[attr]=values;
    }

    return;
}

console.log(getCreatedTimestamp());
//generatePayload(jobinfo.matrix, jobinfo.payload);
