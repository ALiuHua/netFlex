import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  const data = req.body;
  if (req.method !== "POST") return;
  const { email, password } = data;
  try {
    const client = await connectToDatabase();
    console.log(client);
    const db = client.db();
    console.log(client, db);
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
    console.log("result", result);
    res
      .status(201)
      .json({ message: "Account has been created. you can sign in now." });
    client.close();
  } catch (err) {
    console.log("err", err);
  }
}
export default handler;
