
const fs = require('fs')

const testFiles = fs.readdirSync('tests')

const testResults = []

const RUN = async () => {

    console.log(`\n\n\nRunning tests...\n\n\t-----\n\n`)

    for (let testFile of testFiles) {

        let testModule = require(`./tests/${testFile}`)
        
        testResults.push( await testModule.runTests(INIT_TEST) )
    }


    console.log(`\n\n\t-----\n\nA total of ${testResults.length} test suites have been run.\n\n`)

    let totalPass = 0; let totalFail = 0;
    for (let testResult of testResults){

        console.log(`\t=> Test suite results for '${testResult.module}':\n`)

        let results = [...testResult.successes, ...testResult.errors].sort((a, b)=>a.test-b.test)

        totalPass += testResult.successes.length
        totalFail += testResult.errors.length

        for (let result of results){

            if (result.value !== undefined) console.log(`\t\t-> Success for sequence #${result.test} with result:\n\t\t\t-->\t${result.value}\n`)
            if (result.error !== undefined) console.log(`\t\t-> Failure for sequence #${result.test} with result:\n\t\t\t-->\t${result.error}\n`)
        }

        console.log(`\t:: Suite status: ${testResult.status ? 'PASS':'FAIL'}\n`)
    }

    let isPass = (totalFail == 0)

    let totalTests = totalPass + totalFail

    console.log(`Testing complete.\tResults: ${totalPass}/${totalTests}\t\t${isPass ? 'All PASS':'FAIL'}\n\n`)

}

RUN();

/** Framework */

function SETUP_TEST(TEST_PATH) {

    delete require.cache[require.resolve(TEST_PATH)];

    return require(TEST_PATH)
}

async function INIT_TEST(TEST_FACTORY, TEST_PATH) {

    let successes = []
    let errors = []

    let tests = TEST_FACTORY({
        SETUP_TEST: ()=>SETUP_TEST(TEST_PATH),
    })

    let i = 1;
    for (let test of tests) {

        try {

            promise = test().then((res) => {

                successes.push({
                    value: res,
                    test: i
                })
            }).catch((err) => {

                errors.push({
                    error: err,
                    test: i
                })
            })

        } catch (error) {

            console.log(`CRITICAL FAILURE: Unable to load test module.\n\n\tERROR: ${error}`)
        }

        await promise

        i += 1;
    }

    return {
        module: TEST_PATH,
        errors: errors,
        successes: successes,
        status: (errors.length == 0)
    }
}
