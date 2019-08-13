"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@overnightjs/core");
var request_1 = __importDefault(require("request"));
var url_1 = __importDefault(require("url"));
var SlackAuthController = /** @class */ (function () {
    function SlackAuthController(PATH_URI, CLIENT_ID, SCOPE, CLIENT_SECRET, REDIRECT_URI, SLACK_OAUTH_URI) {
        this.PATH_URI = PATH_URI;
        this.CLIENT_ID = CLIENT_ID;
        this.SCOPE = SCOPE;
        this.CLIENT_SECRET = CLIENT_SECRET;
        this.REDIRECT_URI = REDIRECT_URI;
        this.SLACK_OAUTH_URI = SLACK_OAUTH_URI;
        this.REDIRECT_URL = this.generateRedirectURI();
    }
    SlackAuthController.prototype.generateRedirectURI = function () {
        return url_1.default.format({
            pathname: this.PATH_URI,
            query: { client_id: this.CLIENT_ID, scope: this.SCOPE },
        });
    };
    SlackAuthController.prototype.generateSlackOAuthURI = function (code) {
        return url_1.default.format({
            pathname: this.SLACK_OAUTH_URI,
            query: {
                client_id: this.CLIENT_ID,
                client_secret: this.CLIENT_SECRET,
                code: code,
                redirect_uri: this.REDIRECT_URI,
            },
        });
    };
    SlackAuthController.prototype.handleSlackAuth = function (req, res) {
        res.status(302).redirect(this.REDIRECT_URL);
    };
    SlackAuthController.prototype.handleSlackRedirect = function (req, res) {
        var uri = this.generateSlackOAuthURI(req.query.code);
        try {
            request_1.default({ uri: uri, method: 'GET' }, function (error, response, body) {
                var JSONRes = JSON.parse(body);
                if (!JSONRes.ok) {
                    res.status(200).json({ error: JSON.stringify(JSONRes) });
                    return;
                }
                else {
                    res.json(JSONRes);
                }
            });
        }
        catch (err) {
            res.status(200).json({ error: err });
        }
    };
    __decorate([
        core_1.Get(''),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], SlackAuthController.prototype, "handleSlackAuth", null);
    __decorate([
        core_1.Get('redirect'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], SlackAuthController.prototype, "handleSlackRedirect", null);
    SlackAuthController = __decorate([
        core_1.Controller('auth/slack'),
        __metadata("design:paramtypes", [String, String, String, String, String, String])
    ], SlackAuthController);
    return SlackAuthController;
}());
exports.SlackAuthController = SlackAuthController;
