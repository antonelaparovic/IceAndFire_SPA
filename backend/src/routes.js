const express = require("express");
const crypto = require("crypto");
const { hashPassword, verifyPassword, signToken } = require("./auth");
const { requireAuth } = require("./middleware");
const { users, emptyFavs } = require("./store");

const router = express.Router();

async function seedUsers() {
  if (users.length) return;

  users.push({
    id: "user-1",
    email: "user1@test.com",
    passwordHash: await hashPassword("Password123!"),
    favourites: emptyFavs(),
  });

  users.push({
    id: "user-2",
    email: "user2@test.com",
    passwordHash: await hashPassword("Password123!"),
    favourites: emptyFavs(),
  });
}
seedUsers();

/**
 * POST /api/auth/register
 * body: { email, password }
 */
router.post("/auth/register", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  const exists = users.some(
    (u) => u.email.toLowerCase() === String(email).toLowerCase(),
  );
  if (exists)
    return res.status(409).json({ message: "Email already registered" });

  const user = {
    id: crypto.randomUUID(),
    email,
    passwordHash: await hashPassword(password),
    favourites: emptyFavs(),
  };

  users.push(user);
  const token = signToken(user.id);

  res.json({ token, user: { id: user.id, email: user.email } });
});

/**
 * POST /api/auth/login
 * body: { email, password }
 */
router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  const user = users.find(
    (u) => u.email.toLowerCase() === String(email).toLowerCase(),
  );
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = signToken(user.id);
  res.json({ token, user: { id: user.id, email: user.email } });
});

/**
 * GET /api/me
 */
router.get("/me", requireAuth, (req, res) => {
  res.json({ id: req.user.id, email: req.user.email });
});

/**
 * GET /api/me/favourites
 */
router.get("/me/favourites", requireAuth, (req, res) => {
  res.json(req.user.favourites || emptyFavs());
});

/**
 * PUT /api/me/favourites
 * body: { characters: string[], books: string[], houses: string[] }
 */
router.put("/me/favourites", requireAuth, (req, res) => {
  const body = req.body || {};
  const favs = {
    characters: Array.isArray(body.characters) ? body.characters : [],
    books: Array.isArray(body.books) ? body.books : [],
    houses: Array.isArray(body.houses) ? body.houses : [],
  };

  req.user.favourites = favs;
  res.json(favs);
});

module.exports = { router };
