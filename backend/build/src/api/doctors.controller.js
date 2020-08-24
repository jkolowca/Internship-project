"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorsCtrl = void 0;
var doctorsDAO_1 = require("../dao/doctorsDAO");
var visitsDAO_1 = require("../dao/visitsDAO");
var mongodb_1 = require("mongodb");
var DoctorsCtrl = /** @class */ (function () {
    function DoctorsCtrl() {
    }
    DoctorsCtrl.apiGetAll = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var doctors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, doctorsDAO_1.DoctorsDAO.getAll()];
                    case 1:
                        doctors = _a.sent();
                        res.json(doctors);
                        return [2 /*return*/];
                }
            });
        });
    };
    DoctorsCtrl.apiGetById = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, doctor, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = new mongodb_1.ObjectId(req.params.id);
                        return [4 /*yield*/, doctorsDAO_1.DoctorsDAO.getById(id)];
                    case 1:
                        doctor = _a.sent();
                        if (!doctor) {
                            res.status(404).json({ error: 'Not found' });
                            return [2 /*return*/];
                        }
                        res.json(doctor);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log("api, " + e_1);
                        res.status(500).json({ error: e_1 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DoctorsCtrl.apiGetClinics = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, clinics, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = new mongodb_1.ObjectId(req.params.id);
                        return [4 /*yield*/, doctorsDAO_1.DoctorsDAO.getClinics(id)];
                    case 1:
                        clinics = _a.sent();
                        if (!clinics) {
                            res.status(404).json({ error: 'Not found' });
                            return [2 /*return*/];
                        }
                        res.json(clinics);
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        console.log("api, " + e_2);
                        res.status(500).json({ error: e_2 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DoctorsCtrl.apiAdd = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var doctor, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        doctor = req.body;
                        doctor.clinics = doctor.clinics.map(function (string) { return new mongodb_1.ObjectId(string); });
                        return [4 /*yield*/, doctorsDAO_1.DoctorsDAO.add(doctor)];
                    case 1:
                        _a.sent();
                        res.json({ status: 'success' });
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        res.status(500).json({ e: e_3 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DoctorsCtrl.apiUpdate = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var doctor, _id, values, updateResponse, doctors, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        doctor = req.body;
                        doctor.clinics = doctor.clinics.map(function (string) { return new mongodb_1.ObjectId(string); });
                        _id = doctor._id, values = __rest(doctor, ["_id"]);
                        return [4 /*yield*/, doctorsDAO_1.DoctorsDAO.update(new mongodb_1.ObjectId(_id), values)];
                    case 1:
                        updateResponse = _a.sent();
                        if (updateResponse.hasOwnProperty('error')) {
                            res.status(400).json(updateResponse);
                        }
                        if (updateResponse.modifiedCount === 0) {
                            throw new Error('unable to update doctor');
                        }
                        return [4 /*yield*/, doctorsDAO_1.DoctorsDAO.getAll()];
                    case 2:
                        doctors = _a.sent();
                        res.json(doctors);
                        return [3 /*break*/, 4];
                    case 3:
                        e_4 = _a.sent();
                        res.status(500).json({ e: e_4 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DoctorsCtrl.apiDelete = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, doctors, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        id = new mongodb_1.ObjectId(req.params.id);
                        return [4 /*yield*/, visitsDAO_1.VisitsDAO.deleteVisitsByDoctorId(id)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, doctorsDAO_1.DoctorsDAO.delete(id)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, doctorsDAO_1.DoctorsDAO.getAll()];
                    case 3:
                        doctors = _a.sent();
                        res.json(doctors);
                        return [3 /*break*/, 5];
                    case 4:
                        e_5 = _a.sent();
                        res.status(500).json({ e: e_5 });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DoctorsCtrl.getSpecialties = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var specialties, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, doctorsDAO_1.DoctorsDAO.getSpecialties()];
                    case 1:
                        specialties = _a.sent();
                        res.json(specialties);
                        return [3 /*break*/, 3];
                    case 2:
                        e_6 = _a.sent();
                        res.status(500).json({ e: e_6 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return DoctorsCtrl;
}());
exports.DoctorsCtrl = DoctorsCtrl;
