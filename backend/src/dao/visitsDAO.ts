import { Collection, MongoClient, Cursor } from "mongodb";
let visits: Collection<any>;

export class VisitsDAO {
   static async injectDB(conn: MongoClient) {
      if (visits) {
         return;
      }
      try {
         visits = conn.db("registration").collection("visits");
      } catch (e) {
         console.error(`Unable to establish a collection handle in tasksDAO: ${e}`);
      }
   }

   static async getAll() {
      let cursor: Cursor;
      try {
         cursor = visits.find();
      } catch (e) {
         console.error(`Unable to issue find command, ${e}`);
         return { visitsList: [] };
      }

      try {
         const visitsList = await cursor.toArray();

         return { visitsList };
      } catch (e) {
         console.error(`Unable to convert cursor to array or problem counting documents, ${e}`);
         return { visitsList: [] };
      }
   }

   static async add(name: string) {
      try {
         const listDoc = { name };

         return await visits.insertOne(listDoc);
      } catch (e) {
         console.error(`Unable to post list: ${e}`);
         return { error: e };
      }
   }
}
