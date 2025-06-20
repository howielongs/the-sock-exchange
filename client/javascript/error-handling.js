function exampleFunction() {
    try {
        let value = riskyOperation();
    } catch (error) {
        console.error('An error occurred: ', error);
    } finally {
        console.log('The try/catch block has finished executing.');
    }
    console.log('End');
}
function riskyOperation() {
    //placeholder for operation that might throw error

    throw new Error('Example Error');
}

exampleFunction();