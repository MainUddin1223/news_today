import mongoose from 'mongoose';
import app from './app';
import config from './config/index';

async function connectDatabase() {
  try {
    await mongoose.connect(config.database as string);
    console.log('Database connected successfully');
  } catch (error) {
    console.log('Database disconnected');
  }
}
connectDatabase();

app.listen(config.port, () => {
  console.log(`Port is running on port ${config.port}`);
});
