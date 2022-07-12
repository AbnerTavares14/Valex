import express from "express";
import "express-async-errors";
import cors from "cors";
import router from "./routers/index.js";
import dotenv from "dotenv";
import handleErrorsMiddleware from "./middlewares/handlerErrorMiddleware.js";
// import cardRouter from "./routers/cardRouter.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(handleErrorsMiddleware);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});