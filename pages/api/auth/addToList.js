import { connectToDatabase } from "../../../lib/db";
export default async function handler(req, res) {
  //req (user    profileName   movie)
  const client = await connectToDatabase();
  const db = client.db();
  if (req.method === "POST") {
    const { data, user, profileName } = req.body;
    console.log(data);

    const result = await db.collection("mylist").insertOne({
      // _id: data.id,
      user: user,
      profileName: profileName,
      ...data,
    });
    res.status(201).json({ message: "item added" });
    client.close();
  }
  if (req.method === "GET") {
    const { user, profileName } = req.query;

    const listItems = await db
      .collection("mylist")
      .find({ user: user, profileName: profileName })
      .toArray();
    console.log(listItems);
    res.status(201).json({ list: listItems });
    client.close();
  }
}
