import express from "express";
import appConfig from "./config/app.config";

const app = express();
const PORT = appConfig.PORT;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
