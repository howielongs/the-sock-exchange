/*
const promise = new Promise((resolve, reject) => {
    const success = Math.random() > 0.5;

    setTimeout(() => {
        if(success)
            resolve('Success');
        else
            reject (new Error('Rejected with an error'));
    }, 1000);
});

promise 
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error(`Error: ${error.message}`);
    });

*/

fetch('http://localhost:9000/api/socks/1/10')
    .then(response => response.json())
    .then(data => console.log('Data: ', data))
    .catch(error => console.error('Error: ', error))
    .finally(() => console.log('Fetch attempt completed'));