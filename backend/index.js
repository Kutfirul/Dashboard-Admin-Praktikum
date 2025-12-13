import express from "express";
import cors from "cors";
import { db } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM users WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Data berhasil dihapus" });
  });
});
app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const { nama, email, npm, kelas } = req.body;

  const sql = `
    UPDATE users 
    SET nama = ?, email = ?, npm = ?, kelas = ?
    WHERE id = ?
  `;

  db.query(sql, [nama, email, npm, kelas, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Data berhasil diupdate" });
  });
});

app.post("/users", (req, res) => {
  const { nama, email, npm, kelas } = req.body;

  if (!nama || !email || !npm || !kelas) {
    return res.status(400).json({ message: "Data tidak lengkap" });
  }

  const sql = `
    INSERT INTO users (nama, email, npm, kelas)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [nama, email, npm, kelas], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Data berhasil ditambahkan" });
  });
});

app.listen(3001, () => console.log("Backend running on http://localhost:3001"));
