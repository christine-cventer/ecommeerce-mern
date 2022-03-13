import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// By using a function instead of only mongoose.connect
// we allow the function to be exported to server.js
// where we will only spin up the server if the connection to db is successful
// const connectDb = (url) => {
//   return mongoose.connect(url, {
//       useNewUrlParser: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//       useUnifiedTopology: true,
//   });
// };
export default function connectDb() {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log("DB Connected"));

  mongoose.connection.on("error", (err) => {
    console.log(`DB connection error: ${err.message}`);
  });
}
