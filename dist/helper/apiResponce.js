"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiResponse = (payload = {}) => {
    const DataSymbol = Symbol("data");
    const StatusSymbol = Symbol("status");
    const ErrorsSymbol = Symbol("errors");
    const MessageSymbol = Symbol("message");
    const RedirectSymbol = Symbol("redirect");
    const DownloadLinkSymbol = Symbol("downloadLink");
    const AccessTokenSymbol = Symbol("access_token");
    const RefreshTokenSymbol = Symbol("refresh_token");
    class ApiResponse {
        constructor({ data = {}, status = 1, errors = [], message = "", redirect = "", downloadLink = "", access_token = "", refresh_token = "", }) {
            this[DataSymbol] = data;
            this[StatusSymbol] = status;
            this[ErrorsSymbol] = errors;
            this[MessageSymbol] = message;
            this[RedirectSymbol] = redirect;
            this[DownloadLinkSymbol] = downloadLink;
            this[AccessTokenSymbol] = access_token;
            this[RefreshTokenSymbol] = refresh_token;
        }
        get data() {
            return this[DataSymbol];
        }
        set data(data) {
            if (typeof data === "undefined")
                throw new Error("Data must be defined");
            this[DataSymbol] = data;
        }
        get status() {
            return this[StatusSymbol];
        }
        set status(status) {
            this[StatusSymbol] = status;
        }
        get errors() {
            return this[ErrorsSymbol];
        }
        set errors(errors) {
            if (!Array.isArray(errors))
                throw new Error("Errors must be an array");
            this[ErrorsSymbol] = errors;
        }
        get message() {
            return this[MessageSymbol];
        }
        set message(message) {
            if (typeof message !== "string")
                throw new Error("Message must be a string");
            this[MessageSymbol] = message;
        }
        get redirect() {
            return this[RedirectSymbol];
        }
        set redirect(redirect) {
            if (typeof redirect !== "string")
                throw new Error("Redirect must be a string");
            this[RedirectSymbol] = redirect;
        }
        get downloadLink() {
            return this[DownloadLinkSymbol];
        }
        set downloadLink(downloadLink) {
            this[DownloadLinkSymbol] = downloadLink;
        }
        get access_token() {
            return this[AccessTokenSymbol];
        }
        set access_token(access_token) {
            this[AccessTokenSymbol] = access_token;
        }
        get refresh_token() {
            return this[RefreshTokenSymbol];
        }
        set refresh_token(refresh_token) {
            this[RefreshTokenSymbol] = refresh_token;
        }
        toJSON() {
            const responseObj = {
                data: this.data,
                status: this.status,
                errors: this.errors.map((e) => (e.stack ? e.stack : e)),
                message: this.message,
                redirect: this.redirect,
            };
            // Add variable to the response if it's provided
            if (this[DownloadLinkSymbol]) {
                responseObj.downloadLink = this[DownloadLinkSymbol];
            }
            if (this[AccessTokenSymbol]) {
                responseObj.access_token = this[AccessTokenSymbol];
            }
            if (this[RefreshTokenSymbol]) {
                responseObj.refresh_token = this[RefreshTokenSymbol];
            }
            return responseObj;
        }
    }
    return new ApiResponse(payload);
};
exports.default = apiResponse;
