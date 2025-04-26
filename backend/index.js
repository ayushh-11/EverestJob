const express = require("express");
const app = express();
const connection = require("./database/db");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const session = require("express-session")
const cors = require("cors")
const path = require("path");

// Serve static files from "uploads" folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Importing Routes
const createUser = require("./routes/CandidateRegister");
const loginUser = require("./routes/CandidateLogin");
const index = require("./routes/IndexPage")
const updateUser = require("./routes/CandidateUpdate")
const createCompany = require("./routes/CompanyRegister")
const loginCompany = require("./routes/CompanyLogin")
const updateCompany = require("./routes/CompanyUpdate")
const createVacancy = require("./routes/CreateVacancy")
const companyJob = require("./routes/CompanyJob")
const applyVacancy = require("./routes/ApplyVacancy")
const getApplication = require("./routes/GetApplication");
const applicationStatus = require("./routes/ApplicationStatus");

//Initialize session
app.use(session({
    name : 'app.sid',
    secret: "1234567890QWERTY",
    resave: true,
    saveUninitialized: true
}));

//CORS
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your React app's URL
    credentials: true // Allow cookies to be sent
}));

// Load environment variables
dotenv.config();

//static file
app.use('/uploads', express.static('uploads'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Test route
app.get("/", (req, res) => {
    res.send("Hello from server");
});

// Routes
app.use("/", createUser); 
app.use("/",loginUser)
app.use("/",index)
app.use("/",updateUser)
app.use("/", createCompany)
app.use("/", loginCompany)
app.use("/", updateCompany)
app.use("/", createVacancy)
app.use("/", companyJob)
app.use("/", applyVacancy)
app.use("/", getApplication)
app.use("/", applicationStatus)
// Start server
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
    connection();  
    console.log(`Server started on port ${PORT}`);
});
