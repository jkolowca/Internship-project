import { Collection, MongoClient, Cursor } from "mongodb";
let doctors: Collection<any>;

export class DoctorsDAO {
   static async injectDB(conn: MongoClient) {
      if (doctors) {
         return;
      }
      try {
         doctors = conn.db("registration").collection("doctors");
      } catch (e) {
         console.error(`Unable to establish a collection handle in tasksDAO: ${e}`);
      }
   }

   static async getAll() {
      let cursor: Cursor;
      try {
         cursor = doctors.find();
      } catch (e) {
         console.error(`Unable to issue find command, ${e}`);
         return { doctorsList: [] };
      }

      try {
         const doctorsList = await cursor.toArray();

         return { doctorsList };
      } catch (e) {
         console.error(`Unable to convert cursor to array or problem counting documents, ${e}`);
         return { doctorsList: [] };
      }
   }

   static async add(name: string) {
      try {
         const listDoc = { name };

         return await doctors.insertOne(listDoc);
      } catch (e) {
         console.error(`Unable to post list: ${e}`);
         return { error: e };
      }
   }
}
