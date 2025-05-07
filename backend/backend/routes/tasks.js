const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  const { userId } = req;
  const result = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [userId]);
  res.json(result.rows);
});

router.post('/', async (req, res) => {
  const { title, description } = req.body;
  const { userId } = req;
  const result = await pool.query(
    'INSERT INTO tasks (user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
    [userId, title, description]
  );
  res.json(result.rows[0]);
});

router.put('/:id', async (req, res) => {
  const { title, description, status } = req.body;
  const { id } = req.params;
  const { userId } = req;
  const result = await pool.query(
    'UPDATE tasks SET title = $1, description = $2, status = $3 WHERE id = $4 AND user_id = $5 RETURNING *',
    [title, description, status, id, userId]
  );
  res.json(result.rows[0]);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  await pool.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2', [id, userId]);
  res.json({ success: true });
});

module.exports = router;
