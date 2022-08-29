import { MongoClient } from "mongodb";
export async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://andyleo:liuhua6606@netflexcluster.cip9u.mongodb.net/netflex?retryWrites=true&w=majority"
    );
    console.log("client", client);
    if (!client) throw new Error({ message: "Can not connect to db" });
    return client;
  } catch (err) {
    throw new Error(err);
  }
}
