const apiResponse = (payload = {}) => {
    const DataSymbol = Symbol("data");
    const StatusSymbol = Symbol("status");
    const ErrorsSymbol = Symbol("errors");
    const MessageSymbol = Symbol("message");
    const RedirectSymbol = Symbol("redirect");
    const DownloadLinkSymbol = Symbol("downloadLink");
    const access_token = Symbol("access_token");
    const refresh_token = Symbol("refresh_token");     
  
    class ApiResponse {
      constructor({ data = {}, status = 1, errors = [], message = "", redirect = "",downloadLink = "", access_token = "", refresh_token = "" }) {
        this.data = data;
        this.status = status;
        this.errors = errors;
        this.message = message;
        this.redirect = redirect;
        this.downloadLink = downloadLink;
        this.access_token = access_token;
        this.refresh_token = refresh_token;
      }
  
      get data() {
        return this[DataSymbol];
      }
  
      set data(data) {
        if (typeof data === "undefined") throw new Error("Data must be defined");
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
        if (!Array.isArray(errors)) throw new Error("Errors must be an array");
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
  
      toJSON() {
        const responseObj = {
          data: this.data,
          status: this.status,
          errors: this.errors.map((e) => (e.stack ? e.stack : e)),
          message: this.message,
          redirect: this.redirect,
        };
        // Add variable to the response if it's provided
        if (this.downloadLink) {
          responseObj.downloadLink = this.downloadLink;
        }
        if (this.access_token) {
          responseObj.access_token = this.access_token;
        }
        if (this.refresh_token) {
          responseObj.refresh_token = this.refresh_token;
        }
        // console.log(responseObj);
  
        return responseObj;
      }
    }
  
    return new ApiResponse(payload);
  };
  
  module.exports = apiResponse;