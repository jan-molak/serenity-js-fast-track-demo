# Fast-Track Technique Demonstration

The “fast-track technique” relies on substituting some of the UI-based tasks that have already been tested 
and proven to work in other scenarios with their equivalents exercising the Angular Model and the UI Router directly
(or a backend system, like a REST API, a database, etc. - anything that accomplishes the same result, but is faster). 

This dramatically speeds up the execution as the test only interacts only with those sections of the UI that are 
directly relevant to the test scenario.

## Set up

Download the dependencies:

```
npm install
```

## Execution

Execute the scenarios and generate the report:

```
npm run verify
```

View the report:

```
open target/site/serenity/index.html
```
