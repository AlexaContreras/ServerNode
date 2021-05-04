const express = require('express');
const cors = require('cors');
// const axios = require('axios');
const app = express();
const apiRouter = require('./router/api');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Port is set
app.set('port', 5000);

// Router is set
app.use('/api/items', apiRouter);

// Run Server
app.listen(process.env.PORT || app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
