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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = exports.Mockup = void 0;
var express_1 = require("express");
var fs_1 = __importDefault(require("fs"));
var doctorsDAO_1 = require("../dao/doctorsDAO");
var clinicsDAO_1 = require("../dao/clinicsDAO");
var usersDAO_1 = require("../dao/usersDAO");
var visitsDAO_1 = require("../dao/visitsDAO");
var Mockup = /** @class */ (function () {
    function Mockup() {
    }
    Mockup.apiAdd = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var data, visits;
            return __generator(this, function (_a) {
                try {
                    data = JSON.parse(fs_1.default.readFileSync('./src/mockup/doctors.json').toString());
                    doctorsDAO_1.DoctorsDAO.addMany(data);
                    data = JSON.parse(fs_1.default.readFileSync('./src/mockup/clinics.json').toString());
                    clinicsDAO_1.ClinicsDAO.addMany(data);
                    data = JSON.parse(fs_1.default.readFileSync('./src/mockup/users.json').toString());
                    usersDAO_1.UsersDAO.addMany(data);
                    data = JSON.parse(fs_1.default.readFileSync('./src/mockup/visits.json').toString());
                    visits = data.map(function (v) {
                        v.startDate = new Date(v.startDate.$date);
                        v.endDate = new Date(v.endDate.$date);
                        return v;
                    });
                    visitsDAO_1.VisitsDAO.addMany(visits);
                    res.json({ status: 'success' });
                }
                catch (e) {
                    res.status(500).json({ e: e });
                }
                return [2 /*return*/];
            });
        });
    };
    return Mockup;
}());
exports.Mockup = Mockup;
exports.router = express_1.Router();
exports.router.route('/').get(Mockup.apiAdd);
