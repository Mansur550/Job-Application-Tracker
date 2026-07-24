import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = new MongoClient(process.env.MONGODB_URI!);

    await client.connect();

    await client.db().command({ ping: 1 });

    await client.close();

    return NextResponse.json({
      success: true,
      message: "Native MongoDB driver connected successfully!",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}