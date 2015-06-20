Very simple Task-Cluster client that does only one thing. It takes a payload, a
matrix of values to change, and triggers all possible combinations of those
jobs.

Current requirements:
- slugid
- taskcluster-client

Both of these can be npm installed by name

Simply specify your payload in the `job-info.js`.
You can copy over `job-info.example.js` as a starting point.
run `node run-matrix.js` to trigger the jobs.
The payload, the taskId and the task status will be printed out.
