import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./configs/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DB_CONNECTION_STRING,
  },
  out: "./drizzle",
});

console.log(process.env.NEXT_PUBLIC_DB_CONNECTION_STRING);
console.log(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
//console.log(defineConfig.dbCredentials.url);
