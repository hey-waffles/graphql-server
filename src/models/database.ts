
import mongoose from "mongoose";

/**
 * Initializes the database connection
 */
export function initializeDatabase() {
  mongoose.connect(
    process.env.MONGO_ADDRESS, 
    {useNewUrlParser: true, useUnifiedTopology: true}
  )
  .then(() => {
    console.log("Database connected successfully!")
  })
  .catch((e) => {
    console.log(e);
  });
}