import { Request, Response, NextFunction } from "express";
import { DoctorsDAO } from "../dao/doctorsDAO";

export class DoctorsCtrl {
   static async apiGetAll(req: Request, res: Response, next: NextFunction) {
      const { doctorsList } = await DoctorsDAO.getAll();
      res.json(doctorsList);
   }

   static async apiAdd(req: Request, res: Response, next: NextFunction) {
      try {
         const { name } = req.body;

         await DoctorsDAO.add(name);

         const updated = await DoctorsDAO.getAll();

         res.json({ status: "success", doctors: updated });
      } catch (e) {
         res.status(500).json({ e });
      }
   }
}
