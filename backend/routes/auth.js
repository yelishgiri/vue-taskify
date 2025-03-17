require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../database");

const SECRET_KEY = process.env.SECRET_KEY;  // Ensure SECRET_KEY is set in .env
const router = express.Router();

// User signup
router.post("/signup", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    try {
        // Check if username exists
        const checkSql = "SELECT * FROM users WHERE username = ?";
        connection.query(checkSql, [username], async (err, results) => {
            if (err) {
                console.error("Error checking username:", err);
                return res.status(500).json({ message: "Database error." });
            }
            if (results.length > 0) {
                return res.status(400).json({ message: "Username already exists." });
            }

            // Hash password and insert user
            const hashedPassword = await bcrypt.hash(password, 10);
            const insertSql = "INSERT INTO users (username, password_hash) VALUES (?, ?)";
            connection.query(insertSql, [username, hashedPassword], (err) => {
                if (err) {
                    console.error("Error inserting user:", err);
                    return res.status(500).json({ message: "Database error." });
                }
                res.json({ message: "User registered successfully." });
            });
        });
    } catch (err) {
        console.error("Signup failed:", err);
        res.status(500).json({ message: "Signup failed." });
    }
});

// User login
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username) {
        return res.status(400).json({ message: "Username is required." });
    }

    if (username === "guest") {
        // Handle guest login
        const sql = "SELECT * FROM users WHERE username = ?";
        connection.query(sql, [username], (err, results) => {
            if (err) {
                console.error("Error fetching guest user:", err);
                return res.status(500).json({ message: "Database error." });
            }

            if (results.length === 0) {
                // Create guest user if it doesn't exist
                const insertSql = "INSERT INTO users (username, password_hash) VALUES (?, ?)";
                connection.query(insertSql, ["guest", ""], (err, result) => {
                    if (err) {
                        console.error("Error inserting guest user:", err);
                        return res.status(500).json({ message: "Database error." });
                    }
                    const guestToken = jwt.sign({ userId: result.insertId }, SECRET_KEY, { expiresIn: "1h" });
                    return res.json({ token: guestToken });
                });
            } else {
                const guest = results[0];
                const guestToken = jwt.sign({ userId: guest.id }, SECRET_KEY, { expiresIn: "1h" });
                res.json({ token: guestToken });
            }
        });
    } else {
        // Handle regular user login
        const sql = "SELECT * FROM users WHERE username = ?";
        connection.query(sql, [username], async (err, results) => {
            if (err) {
                console.error("Error fetching user:", err);
                return res.status(500).json({ message: "Database error." });
            }
            if (results.length === 0) {
                return res.status(401).json({ message: "Invalid credentials." });
            }

            const user = results[0];
            const isMatch = await bcrypt.compare(password, user.password_hash);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials." });
            }

            const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });
            res.json({ token });
        });
    }
});

module.exports = router;
