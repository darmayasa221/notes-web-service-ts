import express from "express";

const app = express();
const port = 5000;
const host = process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0";

app.get("/", (req, res) => {
  res.send("hellow world");
});

app.listen(port, host, () => {
  // eslint-disable-next-line no-console
  console.log(`listen on ${host}:${port}`);
});
