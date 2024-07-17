"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppResponse {
    constructor() { }
    created = (res, data) => {
        res.status(201).json(data);
    };
    success = (res, data) => {
        res.status(200).json(data);
    };
    accepted = (res, data) => {
        res.status(202).json(data);
    };
    deleted = (res) => {
        res.status(204).json();
    };
    badRequest = (res, data) => {
        return res.status(400).json(data);
    };
    serverError = (res, data) => {
        res.status(500).json(data);
    };
    notAuthorized = (res, data) => {
        res.status(403).json(data);
    };
    notFound = (res, data) => {
        res.status(404).json(data);
    };
}
exports.default = AppResponse;
//# sourceMappingURL=Response.js.map