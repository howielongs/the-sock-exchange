import express from 'express';
import { promises as fs } from 'fs';

//initialize the app and port
const app = express();
app.use(express.json());
const PORT = 3000;

//POST /socks
//handles creation of a new sock resource
//expects a JSON body containing sock detail and features

app.post('/socks/', async (req, res) => { //async (req, res) is the callback function or route handler in express
    try {
        //obligatory reference to POST Malone
        console.log("If POST Malone were a sock, hed' be the one with the most colorful pattern.");
        //simluating creating a user

        const { username, email } = req.body;
        if (!username || !email) {
            //bad request if username or email is missing
            return res.status(400).send({ error: 'Username and email are required.'});
        }
        //respond with the created suer information and a 201 Created status
        res.status(201).send({
            status: 'success',
            location: 'http://localhost:3000/users/', //this url should point to the newly created user
            message: 'User created successfully.'
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Hmm, something smells.. No socks for you!");
    }
});
//CREATE color, more specific
app.get('/socks/:color', async (req, res) => {
    try {
        const { color } = req.params;
        const data = await fs.readFile('../data/socks.json', 'utf-8');
        const socks = JSON.parse(data);

        // Case-insensitive match
        const matchingSocks = socks.filter(sock =>
            sock.color.toLowerCase() === color.toLowerCase()
        );

        if (matchingSocks.length === 0) {
            return res.status(404).send({ message: `No socks found with color '${color}'` });
        }

        res.json(matchingSocks);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send("Something went wrong trying to find socks by color.");
    }
});
//create a route, defines a GET endpoint at /socks
app.get('/socks', async (req, res) => {
    try {
        //read the sock data with readFile and reads it as a string and then parse into javascript object
        const data = await fs.readFile('../data/socks.json', 'utf-8');
        const jsonObj = JSON.parse(data);
        res.json(jsonObj);
    } catch (err) {
        console.error("Error:", err); //if anything goes wrong, send a 500 error (Internal Server Error = 500)
        res.status(500).send("Hmmm, something smells...No socks for you!!");
    }
});

//PUT

app.put('/socks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.body;
        res.status(200).send({
            status: 'succes',
            data: email,
            message: 'User updated successfully.'
        });
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).send("Error updating sock.");
    }
});

//DELETE
app.delete('/socks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Deleting sock with ID: ', id);
        res.status(200).send('Sock deleted successfully.');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send("Hmm, something doesn't smell right.. error deleting sock");
    }
});



//start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
