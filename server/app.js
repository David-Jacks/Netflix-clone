const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const listsRouter = require('./routes/lists');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(cors());

main().catch(err => console.log(err));

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('DB connection okey'); 
    } catch (err) {
        console.log(err);
    }
}

app.use(express.json());

app.use("/api/auth", authRouter);
app.use('/api/users', usersRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/lists', listsRouter);

app.listen(8080);
