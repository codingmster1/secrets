import express from 'express';
import bodyParser from 'body-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 4000;

var userIsAuthorized = false;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

function passwordCheck(req, res, next) {
const password = req.body["password"];
if (password === "123456") {
    userIsAuthorized = true;
    req.routeToServe = '/secret.html';
} else if (password === "654321") {
    userIsAuthorized = true;
    req.routeToServe = '/fact.html';
} else if (password === "112233") {
    userIsAuthorized = true;
    req.routeToServe = '/fact_2.html';
} else if (password === "333333") {
    userIsAuthorized = true;
    req.routeToServe = '/fact_3.html';
} else if (password === "111111") {
    userIsAuthorized = true;
    req.routeToServe = '/cult.html';
} else {
    userIsAuthorized = false;
    req.routeToServe = '/failure.html';
}
next();
}
app.use(passwordCheck);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    
});

app.post('/check', (req, res) => {
    res.sendFile(__dirname + req.routeToServe);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});








