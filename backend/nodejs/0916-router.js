import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("router: /user");
});

router.get("/password", (req, res) => {
  res.send("router: /user/password");
});

export default router;
