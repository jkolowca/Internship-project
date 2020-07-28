import { Collection, MongoClient, Cursor, ObjectId } from "mongodb";
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

   static async add(name: string, surname: string, specialties: ObjectId[], clinics: string[]) {
      try {
         const listDoc = { name, surname, specialties, clinics };

         return await doctors.insertOne(listDoc);
      } catch (e) {
         console.error(`Unable to post list: ${e}`);
         return { error: e };
      }
   }
}

/**
 * A Doctor
 * @typedef Doctor
 * @property {ObjectId} _id
 * @property {string} startDate
 * @property {string} endDate
 * @property {string[]} specialties
 * @property {ObjectId[]} clinics
 */
