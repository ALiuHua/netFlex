import { connectToDatabase } from "../../../lib/db";
export default async function handler(req, res) {
  //req (user    profileName   movie)
  const client = await connectToDatabase();
  const db = client.db();
  if (req.method === "POST") {
    // const { data, user, profileName } = req.body;
    // console.log(data);

    // const result = await db.collection("mylist").insertOne({
    //   // _id: data.id,
    //   user: user,
    //   profileName: profileName,
    //   ...data,
    // });
    // res.status(201).json({ message: "item added" });
    // client.close();
    const { data, user, profileName, action } = req.body;
    console.log("coming form list", data, user, profileName, action);
    // find if there is already one
    const existUserList = await db
      .collection("mylist")
      .findOne({ user: user, profileName: profileName });
    console.log("existUserList", existUserList);
    if (!existUserList) {
      //create new user list
      const result = await db.collection("mylist").insertOne({
        // _id: data.id,
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
        console.log("add run");
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
        console.log("remove run");
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
      // res.status(201).json({ isInMylist: !!listItem });
    } else {
      const listItems = await db
        .collection("mylist")
        .findOne({ user: user, profileName: profileName });

      console.log("listItems", listItems);
      //1. new profile, return undefine  2. have mylist but a []  3 mylist [....]
      res.status(201).json({ list: listItems?.mylist || [] });
      //can not json a undefined value, otherwise will throw a error.
    }

    client.close();
  }
}
