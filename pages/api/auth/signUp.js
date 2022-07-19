import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  const data = req.body;
  if (req.method !== "POST") return;
  const { email, password } = data;

  const client = await connectToDatabase();
  const db = client.db();
  //Check if User is already exsit

  const existingUser = await db.collection("users").findOne({ email: email });
  console.log(existingUser);
  if (existingUser) {
    res
      .status(422)
      .json({ message: "Email exists already, please try anther one" });
    client.close();
    return;
  }
  const hashedPassword = await hashPassword(password);
  const result = await db
    .collection("users")
    .insertOne({ email, password: hashedPassword });
  res.status(201).json({ message: "User created" });
  client.close();
}
export default handler;
