import { connectToDatabase } from "../../../lib/db";
export default async function handler(req, res) {
  const client = await connectToDatabase();
  const db = client.db();
  if (req.method === "POST") {
    const { data, user, profileName, action } = req.body;
    // find if there is already one
    const existUserList = await db
      .collection("mylist")
      .findOne({ user: user, profileName: profileName });
    if (!existUserList) {
      //create new user list
      const result = await db.collection("mylist").insertOne({
        user: user,
        profileName: profileName,
        mylist: [data],
      });
      res.status(201).json({ message: "list create and item added" });
      client.close();
    } else {
      //add new data to original mulist
      if (action === "add") {
        // add movie to exist user list
        const result = await db
          .collection("mylist")
          .updateOne(
            { user: user, profileName: profileName },
            { $push: { mylist: data } }
          );
        res.status(201).json({ message: "item added" });
        client.close();
      }
      if (action === "remove") {
        //removie movie from exist user list
        const result = await db
          .collection("mylist")
          .updateOne(
            { user: user, profileName: profileName },
            { $pull: { mylist: { id: data.id } } }
          );
        res.status(201).json({ message: "item removeed" });
        client.close();
      }
    }
  }
  if (req.method === "GET") {
    const { user, profileName, itemId } = req.query;
    if (itemId) {
      const listItem = await db.collection("mylist").findOne({
        user: user,
        profileName: profileName,
        "mylist.id": +itemId,
      });
      res.status(201).json({ isInMylist: !!listItem });
    } else {
      const listItems = await db
        .collection("mylist")
        .findOne({ user: user, profileName: profileName });
      res.status(201).json({ list: listItems?.mylist || [] });
    }

    client.close();
  }
}
