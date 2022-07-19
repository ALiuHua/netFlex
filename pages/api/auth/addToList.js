import { connectToDatabase } from "../../../lib/db";
export default async function handler(req, res) {
  const data = req.body;
  console.log(data);
  const client = await connectToDatabase();
  const db = client.db();
  if (req.method === "POST") {
    const result = await db
      .collection("mylist")
      .insertOne({ _id: data.id, ...data });
    res.status(201).json({ message: "item added" });
    client.close();
  }
  if (req.method === "GET") {
    const listItems = await db.collection("mylist").find().toArray();
    console.log(listItems);
    res.status(201).json({ list: listItems });
    client.close();
  }
}
