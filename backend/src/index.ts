import { app } from "./server";
import { MongoClient } from "mongodb";
import { DoctorsDAO } from "./dao/doctorsDAO";
import { VisitsDAO } from "./dao/visitsDAO";

const port = 5000 || 8000;

MongoClient.connect("mongodb://localhost:27017", {
   connectTimeoutMS: 2500,
   poolSize: 50,
   useNewUrlParser: true,
   useUnifiedTopology: true,
})
   .catch((err) => {
      console.error(err.stack);
      process.exit(1);
   })
   .then(async (client) => {
      await DoctorsDAO.injectDB(client);
      await VisitsDAO.injectDB(client);
      app.listen(port, () => {
         console.log(`listening on port ${port}`);
      });
   });
