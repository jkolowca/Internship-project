"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var clinics_controller_1 = require("./clinics.controller");
var router = express_1.Router();
router.route('/').get(clinics_controller_1.ClinicsCtrl.apiGetAll).post(clinics_controller_1.ClinicsCtrl.apiAdd);
router.route('/cities').get(clinics_controller_1.ClinicsCtrl.apiGetCities);
router.route('/clinic/:id').delete(clinics_controller_1.ClinicsCtrl.apiDelete);
exports.default = router;
