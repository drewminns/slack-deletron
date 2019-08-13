"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var path;
switch (process.env.NODE_ENV) {
    case 'test':
        path = __dirname + "/../../.env.test";
        break;
    case 'production':
        path = __dirname + "/../../.env.production";
        break;
    default:
        path = __dirname + "/../../.env.development";
}
dotenv.config({ path: path });
exports.CLIENT_ID = process.env.CLIENT_ID;
exports.CLIENT_SECRET = process.env.CLIENT_SECRET;
exports.REDIRECT_URI = process.env.REDIRECT_URI;
exports.SCOPE = process.env.SCOPE;
exports.PATH_URI = process.env.PATH_URI;
exports.SLACK_OAUTH_URI = process.env.SLACK_OAUTH_URI;
