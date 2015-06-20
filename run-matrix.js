#!/usr/bin/env node
"use strict";

// Import required modules
var taskcluster = require('taskcluster-client');
var exec = require('child_process').exec;
var slugid = require('slugid');

// Get job info/config
var jobinfo = require('./job-info');

var taskInspectorURL = 'https://tools.taskcluster.net/task-inspector/'

// Keep track of the # of jobs
var count = 1;

// Create Queue
var queue = new taskcluster.Queue({
    timeout: 30*1000,
    credentials: {
        clientId: process.env.TASKCLUSTER_CLIENT_ID,
        accessToken: process.env.TASKCLUSTER_ACCESS_TOKEN,
    }
});

var generatePayloadAndLaunch = function(matrix, payload) {
    // I might not really need the payload object here...
    // Javascript closures are hard

    if(Object.keys(matrix).length === 0) {
        // Finished applying one set from the matrix
        console.log('Count: ' + count++);
        payload.created = taskcluster.fromNowJSON();
        payload.deadline = taskcluster.fromNowJSON(jobinfo.deadline);
        var taskId = slugid.v4();
        console.log('TaskURL: ' + taskInspectorURL + '#' + taskId);
        console.log();
        console.log(payload);
        queue.createTask(taskId, payload).then(function(result) {
            //console.log(result);
            console.log(result.status);
        }, function(failure) {
            console.log(failure);
            throw new Error('Task could not be created');
        });
        console.log('********************************************************************************');
    }

    // Get an attribute we handle in this function
    var attr = Object.keys(matrix)[0];

    // Values for that attr
    var values = matrix[attr];

    for (var i in values) {
        delete matrix[attr];

        payload.payload[attr] = values[i];
        generatePayloadAndLaunch(matrix, payload);

        // Nasty hack to deal with Javascript object behaviour
        matrix[attr]=values;
    }

    return;
}

generatePayloadAndLaunch(jobinfo.matrix, jobinfo.payload);
