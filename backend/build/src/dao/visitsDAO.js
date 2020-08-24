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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitsDAO = void 0;
var visitsCollection;
var VisitsDAO = /** @class */ (function () {
    function VisitsDAO() {
    }
    VisitsDAO.injectDB = function (conn) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (visitsCollection) {
                    return [2 /*return*/];
                }
                try {
                    visitsCollection = conn.db('registration').collection('visits');
                }
                catch (e) {
                    console.error("VisitsDAO: Unable to establish a collection handle: " + e);
                }
                return [2 /*return*/];
            });
        });
    };
    VisitsDAO.find = function (beforeLookup, afterLookup, page, visitsPerPage) {
        if (page === void 0) { page = 0; }
        if (visitsPerPage === void 0) { visitsPerPage = 10; }
        return __awaiter(this, void 0, void 0, function () {
            var cursor, visits, visitsCount, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        cursor = visitsCollection.aggregate([
                            { $match: beforeLookup },
                            {
                                $lookup: {
                                    from: 'doctors',
                                    localField: 'doctor',
                                    foreignField: '_id',
                                    as: 'doctor',
                                },
                            },
                            { $unwind: { path: '$doctor' } },
                            {
                                $lookup: {
                                    from: 'clinics',
                                    localField: 'clinic',
                                    foreignField: '_id',
                                    as: 'clinic',
                                },
                            },
                            { $unwind: { path: '$clinic' } },
                            { $match: afterLookup },
                            { $sort: { startDate: 1 } },
                        ]);
                        return [4 /*yield*/, cursor.toArray()];
                    case 1:
                        visitsCount = (_a.sent()).length;
                        return [4 /*yield*/, cursor
                                .skip(page * visitsPerPage)
                                .limit(visitsPerPage)
                                .toArray()];
                    case 2:
                        visits = _a.sent();
                        return [2 /*return*/, { visits: visits, visitsCount: visitsCount }];
                    case 3:
                        e_1 = _a.sent();
                        console.error("VisitsDAO: Error while collecting visits data: " + e_1);
                        return [2 /*return*/, { visits: [], visitsCount: 0 }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    VisitsDAO.add = function (visit) {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, visitsCollection.insertOne(visit)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_2 = _a.sent();
                        console.error("VisitsDAO: Unable to post visit: " + e_2);
                        return [2 /*return*/, { error: e_2 }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VisitsDAO.addMany = function (visits) {
        return __awaiter(this, void 0, void 0, function () {
            var e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, visitsCollection.insertMany(visits)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_3 = _a.sent();
                        console.error("VisitsDAO: Unable to post visits: " + e_3);
                        return [2 /*return*/, { error: e_3 }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VisitsDAO.deleteVisitsByDoctorId = function (doctorId) {
        return __awaiter(this, void 0, void 0, function () {
            var e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, visitsCollection.deleteMany({
                                doctor: doctorId,
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_4 = _a.sent();
                        console.error("VisitsDAO: Unable to delete visits: " + e_4);
                        return [2 /*return*/, { error: e_4 }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VisitsDAO.delete = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            var e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, visitsCollection.deleteOne({ _id: _id })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_5 = _a.sent();
                        console.error("VisitsDAO: Unable to delete visit: " + e_5);
                        return [2 /*return*/, { error: e_5 }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VisitsDAO.updateAppointment = function (visitId, appointment) {
        return __awaiter(this, void 0, void 0, function () {
            var e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, visitsCollection.updateOne({ _id: visitId }, { $set: { appointment: appointment } })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { success: true }];
                    case 2:
                        e_6 = _a.sent();
                        console.error("VisitsDAO: Unable to update appointment: " + e_6);
                        return [2 /*return*/, { error: e_6 }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VisitsDAO.deleteAppointment = function (visitId) {
        return __awaiter(this, void 0, void 0, function () {
            var e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, visitsCollection.updateOne({ _id: visitId }, { $unset: { appointment: '' } })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { success: true }];
                    case 2:
                        e_7 = _a.sent();
                        console.error("VisitsDAO: Unable to delete appointment: " + e_7);
                        return [2 /*return*/, { error: e_7 }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VisitsDAO.updateVisit = function (_id, startDate, endDate, clinic) {
        return __awaiter(this, void 0, void 0, function () {
            var updateResponse, e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, visitsCollection.updateOne({ _id: _id }, { $set: { startDate: startDate, endDate: endDate, clinic: clinic } })];
                    case 1:
                        updateResponse = _a.sent();
                        return [2 /*return*/, updateResponse];
                    case 2:
                        e_8 = _a.sent();
                        console.error("VisitsDAO: Unable to update visit: " + e_8);
                        return [2 /*return*/, { error: e_8 }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return VisitsDAO;
}());
exports.VisitsDAO = VisitsDAO;
