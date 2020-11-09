import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser'
import router from './routes'
// Constants
const PORT = 4000;

// App
const app = express();

app.use(cors())

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));


app.use(router);

mongoose.connect('mongodb://root:example@mongo:27017', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
  console.log('DB CONNECTED!')
  app.listen({port: PORT}, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})