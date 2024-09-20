import express from "express";
import CONFIG from "./config/app.config";

const app = express();
const PORT = CONFIG.PORT;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
