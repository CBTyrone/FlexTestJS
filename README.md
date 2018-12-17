# FlexTestJS
Simple and flexible test system for NodeJS. No-frills, ~100 lines of code. Small enough to be easily understood. Customize the run-tests.js file to suit your needs. Plugins welcome.

Simply run 'run-tests.js' to execute each file under ./tests/ . Copy the template under the respository ./tests/ folder and name it such that it mirrors your source file tree (this is a soft covention, it won't affect testing). Typically you could place this within the root of your source folder along with a tests folder, or you can adjust the import variable in the tests to match your new location.

The test file templates support both negative and positive tests, although you need to arrange your tests properly within try-catch blocks as demonstrated. In any case, throwing an error or allowing one to go uncaught signals a fail for a test, while returning any value other than undefined signals success. The runtime will tally the totals per suite and give a readout of the results.
