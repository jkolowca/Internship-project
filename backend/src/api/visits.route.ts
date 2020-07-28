import { Router } from "express";
import { VisitsCtrl } from "./visits.controller";

const router = Router();

router.route("/").get(VisitsCtrl.apiGetAll).post(VisitsCtrl.apiAdd);

export default router;
