"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = void 0;
const admin = __importStar(require("../model/admin.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// const hash = async (password: string): Promise<string> => {
//     return await bcrypt.hash(password, 10)
// }
const compare = (password, comp) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.compare(password, comp);
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [adminUser] = yield admin.findAdminByUsername(req.body.username);
        if (adminUser === undefined || !(yield compare(req.body.password, adminUser.password))) {
            res.statusMessage = 'Invalid email/password';
            res.status(401).send();
            return;
        }
        const token = jsonwebtoken_1.default.sign({ user: adminUser.username }, process.env.JWT_TOKEN, { expiresIn: '1h' });
        res.status(200).json({ "token": token, "username": adminUser.username });
        return;
    }
    catch (err) {
        // console.log(err)
        res.statusMessage = "Internal Server Error!" + err;
        res.status(500).send(err);
        return;
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Logger.http('Logging out User:' + req.body.username )
    return;
});
exports.logout = logout;
//# sourceMappingURL=admin.controllers.js.map