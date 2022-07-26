import { connectToDatabase } from "../../../lib/db";

export default async function handler(req, res) {
  const { profiles, user } = req.body;
  console.log(profiles, user);
  const client = await connectToDatabase();
  const db = client.db();
  const result = await db
    .collection("users")
    .updateOne({ email: user }, { $set: { profiles: profiles } });

  //   const result = await db.collection("profiles").insertMany(profiles);
  res.status(201).json({ message: "User created", result: result });
  client.close();
}
