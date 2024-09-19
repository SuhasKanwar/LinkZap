const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 5000;
const URL = require('./models/url');

// Connection
mongoose.connect("mongodb://127.0.0.1:27017/LinkZap")
    .then(() => console.log("MongoDB Connected"))
    .catch((error) => console.log("Error occurred connecting to MongoDB", error));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.static('./public'));
app.use(express.static('./scripts'));

const urlRoute = require('./routes/url');
const staticRouter = require('./routes/staticRouter');
const userRoute = require('./routes/users');

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
const { restrictToLoggedinUserOnly, checkAuth } = require('./middlewares/auth');

app.use('/url', restrictToLoggedinUserOnly, urlRoute);
app.use('/user', userRoute);
app.use('/', checkAuth, staticRouter);

app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    try{
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now()
                    }
                }
            }
        );
        if(!entry){
            return res.status(404).send("URL not found");
        }
        res.redirect(entry.redirectURL);
    }
    catch(error){
        console.log("Error occurred during redirection", error);
        res.status(500).send("An error occurred");
    }
});

app.listen(PORT, (error) => {
    if(error){
        console.log("Something went wrong", error);
    }
    else{
        console.log(`Server is listening on port -> ${PORT}`);
        console.log(`\n\nhttp://localhost:${PORT}\n\n`);
    }
});