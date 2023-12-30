"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureMiddleware = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const passport_1 = __importDefault(require("passport"));
const configureMiddleware = (app) => {
    app.use((0, cors_1.default)());
    app.options('*', (0, cors_1.default)());
    app.use(body_parser_1.default.json({ limit: '50mb' }));
    app.use(body_parser_1.default.urlencoded({ extended: true, limit: '50mb' }));
    app.use(express_1.default.json());
    app.use((0, compression_1.default)());
    app.use(passport_1.default.initialize());
};
exports.configureMiddleware = configureMiddleware;
