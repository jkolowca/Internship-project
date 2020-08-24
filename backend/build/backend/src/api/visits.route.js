"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var visits_controller_1 = require("./visits.controller");
var router = express_1.Router();
router.route('/').get(visits_controller_1.VisitsCtrl.apiFind).post(visits_controller_1.VisitsCtrl.apiAdd);
router.route('/visit/:id').patch(visits_controller_1.VisitsCtrl.apiUpdate).delete(visits_controller_1.VisitsCtrl.apiDelete);
router.route('/visit/:id/delete').patch(visits_controller_1.VisitsCtrl.apiDeleteAppointment);
exports.default = router;
