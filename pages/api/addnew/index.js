import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const { method } = req;  
  const client = await MongoClient.connect(process.env.DB_URI, {
    useNewUrlParser: true,
  });

  if (method === "POST") {
    try {
      const invoice = {
        senderAddress: {
          street: req.body.senderStreet,
          city: req.body.senderCity,
          postalCode: req.body.senderPostalCode,
          country: req.body.senderCountry,
        },
        clientName: req.body.clientName,
        clientEmail: req.body.clientEmail,
        clientAddress: {
          street: req.body.clientStreet,
          city: req.body.clientCity,
          postalCode: req.body.clientPostalCode,
          country: req.body.clientCountry,
        },
        createdAt: req.body.createdAt,
        paymentDue: req.body.createdAt,
        paymentTerms: req.body.paymentTerms,
        description: req.body.description,
        status: req.body.status,
        items: req.body.items,
        total: req.body.total,
      };

      const db = client.db();
      const collection = db.collection("allInvoices");
      await collection.insertOne(invoice);

      res.status(200).json({ message: "Invoice added successfully" });

      client.close();
    } catch (error) {
      res.status(500).json(err);
    }
  }
}
