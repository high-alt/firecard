"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_functions_1 = __importDefault(require("firebase-functions"));
const next_1 = __importDefault(require("next"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
firebase_admin_1.default.initializeApp();
const dev = process.env.NODE_ENV !== 'production';
const app = (0, next_1.default)({ dev, conf: { distDir: '.next' } });
const handle = app.getRequestHandler();
app.prepare().then(() => {
    exports.nextApp = firebase_functions_1.default.https.onRequest((req, res) => {
        return handle(req, res);
    });
});
