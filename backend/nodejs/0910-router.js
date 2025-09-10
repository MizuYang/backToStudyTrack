import express from "express";

const router = express.Router();

router.get('/page1', (req, res) => {
  res.send('page1');
});

router.get('/page2', (req, res) => {
  res.send('page2');
});

export default router;
