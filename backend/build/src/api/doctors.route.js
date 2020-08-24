"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var doctors_controller_1 = require("./doctors.controller");
var router = express_1.Router();
router
    .route('/')
    .get(doctors_controller_1.DoctorsCtrl.apiGetAll)
    .post(doctors_controller_1.DoctorsCtrl.apiAdd)
    .put(doctors_controller_1.DoctorsCtrl.apiUpdate);
router
    .route('/doctor/:id')
    .get(doctors_controller_1.DoctorsCtrl.apiGetById)
    .delete(doctors_controller_1.DoctorsCtrl.apiDelete);
router.route('/doctor/:id/clinics').get(doctors_controller_1.DoctorsCtrl.apiGetClinics);
router.route('/specialties').get(doctors_controller_1.DoctorsCtrl.getSpecialties);
exports.default = router;
