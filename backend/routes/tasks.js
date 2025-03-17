var express = require("express");
var connection = require("../database");
var authenticateToken = require("../middleware/authMiddleware");

var router = express.Router();

router.get("/", authenticateToken, function (req, res) {
    let userId = req.user.userId; 
    let sql = "SELECT * FROM tasks WHERE userId = ?"; 
    connection.query(sql, [userId], function (err, results) {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

router.post("/", authenticateToken, function (req, res) {
    let { text, completed } = req.body;
    let userId = req.user.userId;
    let sql = "INSERT INTO tasks (text, completed, userId) VALUES (?, ?, ?)"; 
    connection.query(sql, [text, completed, userId], function (err, result) {
        if (err) return res.status(500).send(err);
        res.json({ id: result.insertId, text, completed, userId });
    });
});

router.put("/:id", authenticateToken, function (req, res) {
    let { completed } = req.body;
    let userId = req.user.userId;
    let sql = "UPDATE tasks SET completed = ? WHERE id = ? AND userId = ?";
    connection.query(sql, [completed, req.params.id, userId], function (err, result) {
        if (err) return res.status(500).send(err);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Task not found or you don't have permission to update it" });
        }
        res.json({ message: "Task updated" });
    });
});

router.delete("/:id", authenticateToken, function (req, res) {
    let userId = req.user.userId; // Get the userId from the authenticated user
    let sql = "DELETE FROM tasks WHERE id = ? AND userId = ?"; // Ensure the task belongs to the user
    connection.query(sql, [req.params.id, userId], function (err, result) {
        if (err) return res.status(500).send(err);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Task not found or you don't have permission to delete it" });
        }
        res.json({ message: "Task deleted" });
    });
});

module.exports = router;
