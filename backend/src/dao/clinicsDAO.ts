import { Collection, MongoClient, Cursor } from "mongodb";
let clinics: Collection<any>;

export class ClinicsDAO {
   static async injectDB(conn: MongoClient) {
      if (clinics) {
         return;
      }
      try {
         clinics = conn.db("registration").collection("doctors");
      } catch (e) {
         console.error(`Unable to establish a collection handle in tasksDAO: ${e}`);
      }
   }

   static async getAll() {
      let cursor: Cursor;
      try {
         cursor = clinics.find();
      } catch (e) {
         console.error(`Unable to issue find command, ${e}`);
         return { clinicsList: [] };
      }

      try {
         const clinicsList = await cursor.toArray();

         return { clinicsList };
      } catch (e) {
         console.error(`Unable to convert cursor to array or problem counting documents, ${e}`);
         return { clinicsList: [] };
      }
   }

   static async add(name: string, city: string, street: string, streetNo: number) {
      try {
         const listDoc = { city, street, streetNo };

         return await clinics.insertOne(listDoc);
      } catch (e) {
         console.error(`Unable to post list: ${e}`);
         return { error: e };
      }
   }
}

/**
 * A Clinic
 * @typedef Clinic
 * @property {ObjectId} _id
 * @property {string} name
 * @property {string} city
 * @property {string} street
 * @property {number} streetNo
 */
