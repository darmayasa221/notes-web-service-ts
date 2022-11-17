import express, {
  json,
  Response,
  Request,
  Router,
  NextFunction,
} from "express";
import notes from "@api/notes";
import { TypeResponse } from "@model/response";
import ClientError from "Exceptions/ClientError";
import cors from "cors";

const app = express();
const router = Router();
const port = 5000;
const host = process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0";
// third-partry/build in middleware
app.use(json(), cors());
// third-partry/build in middleware end
// root app
app.use("/api", router);
// router adapter
notes({ router });
// router adapter end
// out of path
app.all("*", (req, res) => {
  res.status(404).send("not found");
});
// out of path end
// error handling
app.use(
  (
    err: ClientError,
    req: Request,
    res: Response<TypeResponse>,
    next: NextFunction,
  ) => {
    if (err instanceof ClientError) {
      return res.status(err.statusCode).json({
        status: "fail",
        message: err.message,
      });
    }
    return res.status(500).json({
      status: "error",
      message: "server error",
    });
  },
);
// error handling end
app.listen(port, host, () => {
  // eslint-disable-next-line no-console
  console.log(`listen on ${host}:${port}`);
});
