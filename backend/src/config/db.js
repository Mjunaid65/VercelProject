import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGO_URI || "mongodb+srv://mjunaidahmed3_db_user:Mjunaid65@junaid.arhutfr.mongodb.net/?appName=junaid/librarydb";
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('MongoDB connected');
};

export default connectDB;

