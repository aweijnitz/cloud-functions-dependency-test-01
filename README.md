# Repo to reproduce and debug cloud functions module loading issue

Repository to debug issue with module loading of Google Cloud Functions

## Problem Summary

For some reason, Google Cloud Functions doesn't seem to be able to load the @google.cloud/* modlues in node.js functions under some circumstances.

This repository is a minimal scaffold to illustrate the issue and how to fix it.
**When deploying the main branch, the initialization of the function will fail, although it works locally and builds deploys correctly using the Google Buildpack locally**.

This repo was created to isolate the issue described on Stack Overflow: https://stackoverflow.com/questions/65538584/google-cloud-functions-sometimes-doesnt-find-google-cloud-dependencies-altho

## Working Versions

There are two ways around the problem and both are illustrated on separate brances in this repo.

```
branch "main" 
- Deploying this version always fails, because the function cannot be initialized, 
due to google cloud not beeing able to locate the package dependency.

branch "working-version" 
- This version fixes the issue by changing the '--source' parameter to the deployment command. 
Bad: --source=./src  
Good: --source=.

branch "index-in-root" 
- This version fixes the issue by hoisting the index.js file out of the src/ folder 
and into the project root AND by changing the '--source' parameter to the deployment 
command to be '--source=.'

```

## Reproducing the issue

Assuming `gcloud` is present and a valid account is setup and initialized.

```
npm run deployHelloWorld
```

The command will trigger an error message along the lines of this

```
> gcloud functions deploy helloWorld --source=./src --entry-point=helloWorld --runtime nodejs12 --memory=256MB --max-instances=3 --trigger-topic=ornitho-bus

Deploying function (may take a while - up to 2 minutes)...⠹
For Cloud Build Stackdriver Logs, visit: https://console.cloud.google.com/logs/viewer?project=ornitho-de-monitor&advancedFilter=resource.type%3Dbuild%0Aresource.labels.build_id%3D75a347c3-28d1-4eb3-b825-617c6f5c6427%0AlogName%3Dprojects%2Fornitho-de-monitor%2Flogs%2Fcloudbuild
Deploying function (may take a while - up to 2 minutes)...failed.
ERROR: (gcloud.functions.deploy) OperationError: code=3, message=Function failed on loading user code. This is likely due to a bug in the user code. Error message: Error: please examine your function logs to see the error cause: https://cloud.google.com/functions/docs/monitoring/logging#viewing_logs. Additional troubleshooting documentation can be found at https://cloud.google.com/functions/docs/troubleshooting#logging. Please visit https://cloud.google.com/functions/docs/troubleshooting for in-depth troubleshooting documentation.
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! cloud-functions-test-01@1.0.0 deployHelloWorld: `gcloud functions deploy helloWorld --source=./src --entry-point=helloWorld --runtime nodejs12 --memory=256MB --max-instances=3 --trigger-topic=ornitho-bus`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the cloud-functions-test-01@1.0.0 deployHelloWorld script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/anders/.npm/_logs/2021-01-02T22_44_50_186Z-debug.log
```
