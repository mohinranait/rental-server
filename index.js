const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const { port } = require('./services/secretEnv');
const connectMongoDb = require('./config/db');
const app  = express();

// Connection database
connectMongoDb()

// import requires routes files
const userRoute = require('./routes/userRoutes');

// Middleware
app.use(cors());
app.use(express.json())
app.use(cookieParser())


app.use('/api/v1', userRoute);

// home route
app.get('/', (req, res) => {
    res.send("Home route is working")
})

app.listen(port, () => {
    console.log(`Server is running at port http://localhost:${port}`);
})