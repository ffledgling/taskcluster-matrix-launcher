module.exports = {
    payload: {
        "provisionerId": "aws-provisioner-v1",
        "workerType": "b2gtest",
        "created": "2015-06-20T03:07:24.886Z",
        "deadline": "2015-06-20T04:07:24.886Z",
        "payload": {
            "image": "ubuntu:13.10",
            "command": [
                "/bin/bash",
                "-c",
                "echo \"hello World\""
            ],
            "maxRunTime": 600
        },
        "metadata": {
            "name": "Example Task",
            "description": "Markdown description of **what** this task does",
            "owner": "name@example.com",
            "source": "http://tools.taskcluster.net/task-creator/"
        }
    },

    matrix: {
        "command" : [
            ["/bin/bash", "-c", "echo \"Hello World #1\""],
            ["/bin/bash", "-c", "echo \"Hello World #2\""],
        ]
    },

    deadline: "+1hour",
    taskPrefix: "ffledgling",
}
