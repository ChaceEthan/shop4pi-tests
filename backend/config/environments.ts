import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",

  pi: {
    apiKey: process.env.PI_API_KEY || "",
    apiUrl: process.env.PI_API_URL || "https://api.minepi.com",
  },

  app: {
    name: process.env.APP_NAME || "Shop4Pi",
    frontendUrl: process.env.FRONTEND_URL || "",
  }
};
