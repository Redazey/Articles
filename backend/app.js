import express from 'express'
import bodyParser from 'body-parser';

const PORT = 5000;

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
    
app.get("/", (req, res) => {
    res.json({ message: "Это стартовая страница нашего приложения" });
});

app.listen(PORT, () => console.log('server listening on port: ' + PORT))