const apiResponse = (payload = {}) => {
    const DataSymbol = Symbol("data");
    const StatusSymbol = Symbol("status");
    const ErrorsSymbol = Symbol("errors");
    const MessageSymbol = Symbol("message");
    const RedirectSymbol = Symbol("redirect");
  
    class ApiResponse {
      constructor({ data = {}, status = 1, errors = [], message = "", redirect = "" }) {
        this.data = data;
        this.status = status;
        this.errors = errors;
        this.message = message;
        this.redirect = redirect;
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
        return {
          data: this.data,
          status: this.status,
          errors: this.errors.map((e) => (e.stack ? e.stack : e)),
          message: this.message,
          redirect: this.redirect
        };
      }
    }
  
    return new ApiResponse(payload);
  };
  
  module.exports = apiResponse;