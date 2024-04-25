import { NextResponse } from "next/server";
import {MongoClient } from "mongodb";
export async function GET() {

 
    const client = new MongoClient(
      "mongodb+srv://user:5uewbNA7iLteCcMp@blog-app.kh8tdua.mongodb.net/",
    );
    try {
      await client.connect();
      const database = client.db("blog-app");
      const collection = database.collection("fs.files");
  const result = await collection.find({ buffer: { $exists: true } }).sort({ uploadDate: 1 }).limit(10).toArray();
      // console.log(result);
      return NextResponse.json(result);
    } catch (error) {
      console.error("Error: ", error);
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    } finally {
      await client.close();
    }
}
