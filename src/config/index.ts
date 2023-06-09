import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });
export default {
  port: process.env.PORT,
  database: process.env.DATABASE_URL,
  jwt_access_token: process.env.ACCESS_TOKEN_SECRET,
};
