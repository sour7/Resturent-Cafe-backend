import app from "./app.js";
import { connectDB } from "./config/database.js";

connectDB();

app.get("/", (req, res, next) => {
  res.send("<h1>hello all!</h1>");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(
    `server is listening on port:${port} in ${process.env.NODE_ENV} mode`
  );
});
