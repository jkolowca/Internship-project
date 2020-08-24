"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.UsersCtrl = void 0;
var usersDAO_1 = require("../dao/usersDAO");
var mongodb_1 = require("mongodb");
var bcrypt = __importStar(require("bcryptjs"));
var jbw = __importStar(require("jsonwebtoken"));
var UsersCtrl = /** @class */ (function () {
    function UsersCtrl() {
    }
    UsersCtrl.apiGetAll = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, usersDAO_1.UsersDAO.getAll()];
                    case 1:
                        users = _a.sent();
                        res.json(users);
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersCtrl.apiGetById = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = new mongodb_1.ObjectId(req.params.id);
                        return [4 /*yield*/, usersDAO_1.UsersDAO.getById(id)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            res.status(404).json({ error: 'Not found' });
                            return [2 /*return*/];
                        }
                        res.json(user);
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
    UsersCtrl.apiLogin = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, , 2, 3]);
                        return [4 /*yield*/, usersDAO_1.UsersDAO.getByEmail(req.body.email)
                                .then(function (user) {
                                if (!user) {
                                    return res.status(401).json({
                                        message: 'Not found',
                                    });
                                }
                                return bcrypt
                                    .compare(req.body.password, user.password)
                                    .then(function (response) {
                                    if (!response) {
                                        return res.status(401).json({
                                            message: 'Authentication failed',
                                        });
                                    }
                                    var jwtToken = jbw.sign({
                                        email: user.email,
                                        userId: user._id,
                                    }, 'longer-secret-is-better', {
                                        expiresIn: '1h',
                                    });
                                    res.status(200).json({
                                        token: jwtToken,
                                        expiresIn: 3600,
                                        user: user,
                                    });
                                })
                                    .catch(function () {
                                    return res.status(401).json({
                                        message: 'Authentication failed',
                                    });
                                });
                            })
                                .catch(function (err) { return console.error(err); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2: return [7 /*endfinally*/];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsersCtrl.apiAddUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user, _a, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        user = req.body;
                        _a = user;
                        return [4 /*yield*/, bcrypt.hash(user.password, 10)];
                    case 1:
                        _a.password = _b.sent();
                        if (!user.accountType)
                            user.accountType = 'patient';
                        return [4 /*yield*/, usersDAO_1.UsersDAO.add(user)];
                    case 2:
                        _b.sent();
                        res.json({ status: 'success' });
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _b.sent();
                        res.status(500).json({ e: e_2 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UsersCtrl;
}());
exports.UsersCtrl = UsersCtrl;
