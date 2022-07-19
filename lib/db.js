import { MongoClient } from "mongodb";
export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://andyleo:liuhua6606@netflexcluster.cip9u.mongodb.net/netflex?retryWrites=true&w=majority"
  );
  return client;
}
