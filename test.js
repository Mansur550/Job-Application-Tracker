const { MongoClient } = require("mongodb");
require("dotenv").config({ path: ".env.local" });

const uri = process.env.MONGODB_URI;

async function main() {
  console.log("Creating client...");
  const client = new MongoClient(uri);

  try {
    console.log("Connecting...");
    await client.connect();
    console.log("✅ Connected successfully!");
  } catch (err) {
    console.error("❌ Connection failed:");
    console.error(err);
  } finally {
    await client.close();
    console.log("Closed.");
  }
}

main();