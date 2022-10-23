import express, { Router } from "express";

const app = express();
const router = Router();
const port = 5000;
const host = process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0";

router.get("/", (req, res) => {
  res.send("hellow world");
});
app.use("/", router);

app.listen(port, host, () => {
  // eslint-disable-next-line no-console
  console.log(`listen on ${host}:${port}`);
});
