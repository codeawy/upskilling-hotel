import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.listen(5000, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
