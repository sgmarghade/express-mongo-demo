const express = require('express');
const app = express();

require('./startup/db')();
require('./startup/config')(app);
require('./startup/routes')(app);

app.use((err, req, res, next) => {
   console.log('Caught exception by last middleware', err);
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Express server is up on ${PORT}`);
});