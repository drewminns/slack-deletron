"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@overnightjs/core");
var logger_1 = require("@overnightjs/logger");
var body_parser_1 = __importDefault(require("body-parser"));
var helmet_1 = __importDefault(require("helmet"));
var SlackAuth_1 = require("./controllers/SlackAuth");
var config_1 = require("./utils/config");
var AppServer = /** @class */ (function (_super) {
    __extends(AppServer, _super);
    function AppServer() {
        var _this = _super.call(this, true) || this;
        _this.SERVER_STARTED = 'Example server started on port: ';
        _this.app.use(body_parser_1.default.json());
        _this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        _this.app.use(helmet_1.default.xssFilter());
        _this.setupControllers();
        return _this;
    }
    AppServer.prototype.start = function (port) {
        var _this = this;
        this.app.listen(port, function () {
            logger_1.Logger.Imp(_this.SERVER_STARTED + " " + port);
        });
    };
    AppServer.prototype.setupControllers = function () {
        var exampleController = new SlackAuth_1.SlackAuthController(config_1.PATH_URI, config_1.CLIENT_ID, config_1.SCOPE, config_1.CLIENT_SECRET, config_1.REDIRECT_URI, config_1.SLACK_OAUTH_URI);
        _super.prototype.addControllers.call(this, [exampleController]);
    };
    return AppServer;
}(core_1.Server));
exports.AppServer = AppServer;
