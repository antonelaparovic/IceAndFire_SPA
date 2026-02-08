const express = require("express");
const cors = require("cors");
const { router: apiRouter } = require("./routes");

const app = express();

app.use(cors({ origin: "http://localhost:4200" }));
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api", apiRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`),
);
