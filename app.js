import dotenv from "dotenv";
import connectDb from "./middleware/config/connectDb.js";
import createServer from "./server.js";
dotenv.config();

const app = createServer();
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Listening on port:${PORT}`));
connectDb();

export default app;
