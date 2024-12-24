require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');

const app = express();
const port = 3000;

app.use(
    session({
        secret: process.env.SESSION_SECRET || 'fallback-secret-key',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: process.env.NODE_ENV === 'production' },
    })
);

// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(flash());

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});


// Middleware
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
});
app.get('/product', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'product.html')); // ตรวจสอบเส้นทางนี้ให้ถูกต้อง
});


app.get('/navbar', (req, res) => {
    const navbarLinks = [
      { name: "Home", link: "/" },
      { name: "Features", link: "#features" },
      { name: "Testimonial", link: "#testimonial" },
      { name: "Shop", link: "/product" },
      { name: "About us", link: "/about" },
      { name: "Profile", link: "/profile" },
      { name: "Login", link: "/login" }
    ];
  
    res.json(navbarLinks); // ส่งข้อมูลในรูปแบบ JSON
  });

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database!');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
