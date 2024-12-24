require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const ejs = require('ejs');
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


db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log("Connected to MySQL database.");
});
// Middleware

app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
        secret: "your_secret_key",
        resave: false,
        saveUninitialized: true,
    })
);





app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    // เข้ารหัสรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(sql, [username, email, hashedPassword], (err, result) => {
        if (err) {
            console.error("Error saving user to database:", err);
            return res.status(500).send("Error registering user.");
        }
        res.sendFile(path.join(__dirname, 'view', 'Login.html'));
    });
});
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.error("Error querying database:", err);
            return res.status(500).send("Error logging in.");
        }

        if (results.length === 0) {
            return res.status(401).send("Invalid email or password.");
        }

        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).send("Invalid email or password.");
        }

        // สร้าง session ให้ผู้ใช้
        req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email,
        };

        res.sendFile(path.join(__dirname, 'view', 'index.html'));
    });
});
app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error logging out:", err);
            return res.status(500).send("Error logging out.");
        }
        res.sendFile(path.join(__dirname, 'view', 'Login.html'));
    });
});


// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
});
app.get('/product', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'product.html'));
});
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'about.html'));
});
app.get('/Login', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'Login.html'));
});
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'register.html'));
});
app.get('/basket', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'basket.html'));
});
app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'cart.html'));
});



app.get('/Aether_Grip', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'product/Aether_Grip.html'));
});

app.get('/Cosmic_Eye', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'product/Cosmic_Eye.html'));
});

app.get('/Cosmic_Orb', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'product/Cosmic_Orb.html'));
});

app.get('/Inferno_Gear', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'product/Inferno_Gear.html'));
});

app.get('/NeoVision', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'product/NeoVision.html'));
});

app.get('/Stellar_Nexus', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'product/Stellar_Nexus.html'));
});

app.get('/Void_Amulet', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'product/Void_Amulet.html'));
});


app.get('/buy-now', (req, res) => {
    res.redirect('/product');
});
app.get('/buy', (req, res) => {
    const productLinks = [
        { name: "Aether_Grip", link: "/product/Aether_Grip" },
        { name: "Cosmic_Eye", link: "/product/Cosmic_Eye" },
        { name: "Cosmic_Orb", link: "/product/Cosmic_Orb" },
        { name: "Inferno_Gear", link: "/product/Inferno_Gear" },
        { name: "NeoVision", link: "/product/NeoVision" },
        { name: "Stellar_Nexus", link: "/product/Stellar_Nexus" },
        { name: "Void_Amulet", link: "/product/Void_Amulet" }
    ];

    res.json(productLinks); // ส่งข้อมูล JSON กลับไป
});


app.get('/navbar', (req, res) => {
    const navbarLinks = [
        { name: "Home", link: "/" },
        { name: "Features", link: "/#features" },
        { name: "Testimonial", link: "/#Testimonial" },
        { name: "Shop", link: "/product" },
        { name: "About us", link: "/about" },
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
