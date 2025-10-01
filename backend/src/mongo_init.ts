import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';


const client = new MongoClient(process.env.DB_URI!);

(async () => {

    const db = client.db();

    // ensure the collection uses a clustered index
    await db.createCollection("post", { clusteredIndex: { key: { _id: 1}, unique: true } });

    await import("./schema.js");

    await mongoose.connect(process.env.DB_URI!);

    console.log(db.listCollections());

})();

