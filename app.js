import express from 'express';
import { gemini_api_call } from './gemini_api_call.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
//app.use(express.static(path.join(__dirname, 'public')));
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));


app.get('/favicon.ico', (req, res) => res.status(204));


app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'public', 'index.html'));
     // res.sendFile('index.html')
});

app.post('/gemini', async (req, res) => {
    try {
        const { userQuery } = req.body;

        if (!userQuery) {
            return res.status(400).send('No query provided');
        }

        const responseText = await gemini_api_call(userQuery);
        res.json({ responseText });
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        res.status(500).send('Error processing your request');
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});