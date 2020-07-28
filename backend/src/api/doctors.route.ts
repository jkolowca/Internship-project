import { Router } from "express";
import { DoctorsCtrl } from "./doctors.controller";

const router = Router();

router.route("/").get(DoctorsCtrl.apiGetAll).post(DoctorsCtrl.apiAdd);

export default router;
