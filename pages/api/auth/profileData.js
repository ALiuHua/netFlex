import { connectToDatabase } from "../../../lib/db";

export default async function handler(req, res) {
  const client = await connectToDatabase();
  const db = client.db();
  if (req.method === "POST") {
    const { profiles, user } = req.body;
    const result = await db
      .collection("users")
      .updateOne({ email: user }, { $set: { profiles: profiles } });
    res.status(201).json({ message: "User profiles created", result: result });
  }
  if (req.method === "GET") {
    const { user } = req.query;
    const result = await db.collection("users").findOne({ email: user });
    res.status(201).json({ isNewUser: !result?.profiles });
  }
  client.close();
}
