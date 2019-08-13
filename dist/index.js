"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Server_1 = require("./Server");
var appServer = new Server_1.AppServer();
appServer.start(3000);
