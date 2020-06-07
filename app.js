const express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    taskRoutes = require('./src/api/task-routes'),
    bodyParser = require('body-parser'),
    initDB = require('./src/services/seed');

const dirName = path.resolve();
const app = express();
app.use('/', express.static(`${dirName}/src/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/tasks', taskRoutes);

app.get('*', (req, res) => res.sendFile(`${dirName}/src/public/index.html`));

mongoose.connect("mongodb://localhost/task_force_db");
initDB();

app.listen(3001, () => console.log('Express UP'));
