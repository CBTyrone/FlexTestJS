
const assert = require('assert')

const TEST_PATH = './local/objects.js' // Note: This filepath should be edited to match the test-suite file's intent


module.exports = {

    runTests: (TEST_RUNNER)=>{

        return TEST_RUNNER(TEST_FACTORY, TEST_PATH)
    },
}

function TEST_FACTORY(T){ // Note: this is the only function that should be edited in a test suite, returning an array of async tests

    return [
        async () => { /** TEST 1 */
            
            /** This test uses a normal test structure where success is desired */
      
            try {

                const TEST = T.SETUP_TEST()
                const result = TEST.hello('world') // Intended to fail, only hello('world') should work
      
                assert(result == 'Hi!', 'We did not say hello world')

            } catch (err) {

                throw `Error: ${err}` // We did not say hello world. Returning signals test success
            }

            return "Success: We got a reply!"
        },
        async () => { /** TEST 2 */

            /** This test uses an inverted test structure where failure is desired */
      
            try {

                const TEST = T.SETUP_TEST()
                const result = TEST.hello('worlds') // Intended to fail, only hello('world') should work
      
                assert(result == 'Hi!', 'We did not say hello world')

            } catch (err) {

                return `Success: ${err}` // We did not say hello world. Returning signals test success
            }

            throw "Error: We got a reply!"
        },
    ]
}
