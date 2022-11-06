import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {
  const { invoiceId } = req.query;

  const client = await MongoClient.connect(process.env.DB_URI, {
    useNewUrlParser: true,
  });

  const db = client.db();
  const collection = db.collection("allInvoices");

  if (req.method === "PUT") {
    await collection.updateOne(
      { _id: ObjectId(invoiceId) },
      {
        $set: {
          status: "paid",
        },
      }
    );

    res.status(200).json({ message: "Invoice paid" });
    client.close();
  }

  //   delete request
  if (req.method === "DELETE") {
    await collection.deleteOne({ _id: ObjectId(invoiceId) });

    res.status(200).json({ message: "Invoice deleted successfully" });
    client.close();
  }
}

export default handler;
