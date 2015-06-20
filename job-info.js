// You can use this as a template to modify/add your own payload and matrix
// Please do not touch the module.exports setup, simply add/modify the contents
module.exports = {

    deadline: "+5days",

    payload: {
        "provisionerId": "aws-provisioner-v1",
        "workerType": "b2gtest",
        "created": "2015-06-20T11:13:39.606Z",
        "deadline": "2015-06-20T12:13:39.606Z",
        "payload": {
            "image": "quay.io/ffledgling/build-desktop-temp",
            "command": [
                "/bin/bash",
                "-c",
                "cd /home/worker/ && ./bin/checkout-sources.sh && ./workspace/build/src/testing/taskcluster/scripts/builder/build-sm.sh"
            ],
            "env": {
                "GECKO_REPOSITORY": "http://hg.mozilla.org/users/ffledgling_gmail.com/mc",
                "MOZHARNESS_DISABLE": 1,
                "TOOLS_DISABLE": 1,
                "SPIDERMONKEY_VARIANT": "compacting"
            },
            "maxRunTime": 21600
        },
        "metadata": {
            "name": "Spidermonkey Test Build",
            "description": "Experimental builds testing Spidermonkey in Task Container",
            "owner": "ffledgling@gmail.com",
            "source": "https://github.com/ffledgling/taskcluster-matrix-launcher"
        }
    },

    matrix: {
        // arm-sim
        // arm-sim-osx
        // compacting
        // generational
        // plain
        // plaindebug
        // rootanalysis
        // warnaserr
        // warnaserrdebug

        "env": [
        {
            "GECKO_REPOSITORY": "http://hg.mozilla.org/users/ffledgling_gmail.com/mc",
            "MOZHARNESS_DISABLE": 1,
            "TOOLS_DISABLE": 1,
            "SPIDERMONKEY_VARIANT": "arm-sim"
        },
        {
            "GECKO_REPOSITORY": "http://hg.mozilla.org/users/ffledgling_gmail.com/mc",
            "MOZHARNESS_DISABLE": 1,
            "TOOLS_DISABLE": 1,
            "SPIDERMONKEY_VARIANT": "arm-sim-osx"
        },
        {
            "GECKO_REPOSITORY": "http://hg.mozilla.org/users/ffledgling_gmail.com/mc",
            "MOZHARNESS_DISABLE": 1,
            "TOOLS_DISABLE": 1,
            "SPIDERMONKEY_VARIANT": "compacting"
        },
        {
            "GECKO_REPOSITORY": "http://hg.mozilla.org/users/ffledgling_gmail.com/mc",
            "MOZHARNESS_DISABLE": 1,
            "TOOLS_DISABLE": 1,
            "SPIDERMONKEY_VARIANT": "generational"
        },
        {
            "GECKO_REPOSITORY": "http://hg.mozilla.org/users/ffledgling_gmail.com/mc",
            "MOZHARNESS_DISABLE": 1,
            "TOOLS_DISABLE": 1,
            "SPIDERMONKEY_VARIANT": "plain"
        },
        {
            "GECKO_REPOSITORY": "http://hg.mozilla.org/users/ffledgling_gmail.com/mc",
            "MOZHARNESS_DISABLE": 1,
            "TOOLS_DISABLE": 1,
            "SPIDERMONKEY_VARIANT": "plaindebug"
        },
        {
            "GECKO_REPOSITORY": "http://hg.mozilla.org/users/ffledgling_gmail.com/mc",
            "MOZHARNESS_DISABLE": 1,
            "TOOLS_DISABLE": 1,
            "SPIDERMONKEY_VARIANT": "rootanalysis"
        },
        {
            "GECKO_REPOSITORY": "http://hg.mozilla.org/users/ffledgling_gmail.com/mc",
            "MOZHARNESS_DISABLE": 1,
            "TOOLS_DISABLE": 1,
            "SPIDERMONKEY_VARIANT": "warnaserr"
        },
        {
            "GECKO_REPOSITORY": "http://hg.mozilla.org/users/ffledgling_gmail.com/mc",
            "MOZHARNESS_DISABLE": 1,
            "TOOLS_DISABLE": 1,
            "SPIDERMONKEY_VARIANT": "warnaserrdebug"
        },
        ],
    },
}
