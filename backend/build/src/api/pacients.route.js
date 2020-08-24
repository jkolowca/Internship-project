"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users_controller_1 = require("./users.controller");
var router = express_1.Router();
router.route('/').get(users_controller_1.UsersCtrl.apiGetAll).post(users_controller_1.UsersCtrl.apiAdd);
router
    .route('/:id')
    .get(users_controller_1.UsersCtrl.apiGetById);
exports.default = router;
