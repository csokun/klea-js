import express from 'express';
import cors from 'cors';
import { tts } from './model.js';

const HOST= process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());

app.get('/:word', async (req, res) => {
    if(req.params.word && req.params.word.length <= 80){
        console.log(`Received request for ${req.params.word}`)
        const buffer = await tts(req.params.word);
        // TODO: convert to mp3 | ogg if need be
        res.setHeader('Content-Type', 'audio/wav');
        res.send(buffer);
    } else {
        res.status(400).send('Bad Request');
    }
});

app.listen(PORT, HOST, () => {
    console.log(`Listening on http://${HOST}:${PORT}`);
});