import express from "express";
import cors from "cors";
import recipesRouter from "./routes/recipes.js";

const app = express();
const PORT = parseInt(process.env.PORT ?? "3001", 10);

app.use(cors());
app.use(express.json({ limit: "5mb" }));

app.use("/api/recipes", recipesRouter);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`);
});
