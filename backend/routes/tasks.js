var express = require("express");
var connection = require("../database");
var authenticateToken = require("../middleware/authMiddleware");

var router = express.Router();

router.get("/", authenticateToken, function (req, res) {
    let sql = "SELECT * FROM tasks";
    connection.query(sql, function (err, results) {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

router.post("/", authenticateToken, function (req, res) {
    let { text, completed } = req.body;
    let sql = "INSERT INTO tasks (text, completed) VALUES (?, ?)";
    connection.query(sql, [text, completed], function (err, result) {
        if (err) return res.status(500).send(err);
        res.json({ id: result.insertId, text, completed });
    });
});

router.put("/:id", authenticateToken, function (req, res) {
    let { completed } = req.body;
    let sql = "UPDATE tasks SET completed = ? WHERE id = ?";
    connection.query(sql, [completed, req.params.id], function (err, result) {
        if (err) return res.status(500).send(err);
        res.json({ message: "Task updated" });
    });
});

router.delete("/:id", authenticateToken, function (req, res) {
    let sql = "DELETE FROM tasks WHERE id = ?";
    connection.query(sql, [req.params.id], function (err, result) {
        if (err) return res.status(500).send(err);
        res.json({ message: "Task deleted" });
    });
});

module.exports = router;