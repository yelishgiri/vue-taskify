var express = require("express");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var connection = require("../database");

const SECRET_KEY = process.env.SECRET_KEY;  // Ensure SECRET_KEY is set in .env
var router = express.Router();

// User registration (signup)
router.post("/signup", async function (req, res) {
    const { username, password } = req.body;
    
    // Basic validation
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        let sql = "INSERT INTO users (username, password) VALUES (?, ?)";
        connection.query(sql, [username, hashedPassword], function (err, result) {
            if (err) return res.status(500).send({ message: "Database error." });
            res.json({ message: "User registered successfully" });
        });
    } catch (err) {
        res.status(500).send({ message: "Signup failed." });
    }
});

// User login
router.post("/login", function (req, res) {
    const { username, password } = req.body;

    // Check for guest login (no password required)
    if (username === 'guest') {
        let sql = "SELECT * FROM users WHERE username = ?";
        connection.query(sql, [username], function (err, results) {
            if (err) {
                return res.status(500).send({ message: "Database error." });
            }

            if (results.length === 0) {
                // If guest doesn't exist, create a new guest user
                let insertSql = "INSERT INTO users (username, password) VALUES (?, ?)";
                connection.query(insertSql, ['guest', ''], function (err, result) {
                    if (err) {
                        return res.status(500).send({ message: "Database error." });
                    }

                    const guestToken = jwt.sign({ userId: result.insertId }, SECRET_KEY, { expiresIn: '1h' });
                    return res.json({ token: guestToken });
                });
            } else {
                // Guest user exists, log them in
                const guest = results[0];
                const guestToken = jwt.sign({ userId: guest.id }, SECRET_KEY, { expiresIn: '1h' });
                res.json({ token: guestToken });
            }
        });
    } else {
        // Regular login logic
        let sql = "SELECT * FROM users WHERE username = ?";
        connection.query(sql, [username], async function (err, results) {
            if (err) return res.status(500).send({ message: "Database error." });
            if (results.length === 0) return res.status(401).json({ message: "Invalid credentials" });

            const user = results[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

            const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });
            res.json({ token });
        });
    }
});

module.exports = router;
