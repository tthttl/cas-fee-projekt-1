const express = require('express'),
    path = require('path');

const dirName = path.resolve();
const app = express();
app.use('/', express.static(`${dirName}/src/public`));
app.get('*', (req, res) => res.sendFile(`${dirName}/src/public/index.html`));

app.listen(3001, () => console.log('Express UP'));
