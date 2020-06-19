const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const taskRoutes = require('./src/api/task-routes');
const initDB = require('./src/services/seed');

const dirName = path.resolve();
const app = express();
app.use('/', express.static(`${dirName}/src/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/tasks', taskRoutes);

app.get('*', (req, res) => res.sendFile(`${dirName}/src/public/index.html`));

mongoose.connect('mongodb://localhost/task_force_db');
initDB();

app.listen(3001, () => console.log('Express UP'));
