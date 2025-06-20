//this lambda function takes an image in (base64) shrinks it to 100x100 using the Sharp
//library, then returns it -- still in base64 format for the website

const sharp = require('sharp');

exports.handler = async (event) => {
    try {
        const inputBuffer = Buffer.from(event.body, 'base64');
        const outputBuffer = await sharp(inputBuffer)
            .resize(100,100) //can adjust dimensions as needed
            .toBuffer();
        const outputBase64 = outputBuffer.toString('base64');
        //HTTP Response
        return {
            statusCode: 200,
            isBase64Encoded: true,
            headers: {
                'Content-Type': 'image/jpeg',
            },
            body: outputBase64,
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error processing image', errorval: error }),
        };
    }
};