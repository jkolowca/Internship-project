import { MongoClient, Collection } from 'mongodb';
let tasks: Collection<any>;

export class DoctorsDAO {
    static async injectDB(conn: MongoClient) {
      if (tasks) {
        return;
      }
      try {
        tasks = conn.db("todo").collection("tasks");
      } catch (e) {
        console.error(
          `Unable to establish a collection handle in tasksDAO: ${e}`
        );
      }
    }
}