const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const authRoutes = require("./routes/authroutes");
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

//dotenv config
dotenv.config()

// middleware
app.use(express.static('public'));
app.use(express.json())
app.use(cookieParser())

//allow cross origin requests 
app.use(cors())
// view engine
app.set('view engine', 'ejs');
 
// database connection
mongoose.connect(process.env.DBURI, { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true})
  
const port = 3000 || process.env.PORT

app.listen( app.listen(port))

// routes
app.get("*",checkUser)
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth ,(req, res) => res.render('smoothies'));
app.use(authRoutes)