const express = require('express');
const app =express();
const mongoose = require('mongoose');
const cors= require('cors');
const postsRoute= require('./routes/posts');
const bodyParser = require('body-parser');
require('dotenv').config();
app.use(cors());
app.use(bodyParser.json());  
app.use('/posts', postsRoute);

app.get('/', (req, res)=>{
	res.send('Welcome to my smart transport system');
})
const url = 'mongodb://127.0.0.1:27017/smart2transport'
mongoose.connect(url, { useNewUrlParser: true })
/*mongoose
.connect(process.env.DB_CONNECTION, { dbName: 'test', useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected to db"))
.catch(err => console.log(`Could not Connected to db ${process.env.DB_CONNECTION} `, err));
*/
const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));