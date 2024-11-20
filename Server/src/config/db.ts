import mongoose from "mongoose";

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) {
    throw new Error("MONGO_URI is not defined in the environment variables.");
  }
  // await mongoose.connect(mongoURI, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // } as mongoose.ConnectOptions);
  await mongoose.connect(mongoURI)
    .then(() => {
      console.log('Connected to MongoDB')
    }).catch(err => {
      console.log('Error connecting to MongoDB', err)
      process.exit(1);
    })

};

export default connectDB;
