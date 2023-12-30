const apiResponse = (payload: any = {}) => {
  const DataSymbol = Symbol("data");
  const StatusSymbol = Symbol("status");
  const ErrorsSymbol = Symbol("errors");
  const MessageSymbol = Symbol("message");
  const RedirectSymbol = Symbol("redirect");
  const DownloadLinkSymbol = Symbol("downloadLink");
  const AccessTokenSymbol = Symbol("access_token");
  const RefreshTokenSymbol = Symbol("refresh_token");

  class ApiResponse {
    private [DataSymbol]: any;
    private [StatusSymbol]: number;
    private [ErrorsSymbol]: any[];
    private [MessageSymbol]: string;
    private [RedirectSymbol]: string;
    private [DownloadLinkSymbol]: string;
    private [AccessTokenSymbol]: string;
    private [RefreshTokenSymbol]: string;

    constructor({
      data = {},
      status = 1,
      errors = [],
      message = "",
      redirect = "",
      downloadLink = "",
      access_token = "",
      refresh_token = "",
    }: {
      data?: any;
      status?: number;
      errors?: any[];
      message?: string;
      redirect?: string;
      downloadLink?: string;
      access_token?: string;
      refresh_token?: string;
    }) {
      this[DataSymbol] = data;
      this[StatusSymbol] = status;
      this[ErrorsSymbol] = errors;
      this[MessageSymbol] = message;
      this[RedirectSymbol] = redirect;
      this[DownloadLinkSymbol] = downloadLink;
      this[AccessTokenSymbol] = access_token;
      this[RefreshTokenSymbol] = refresh_token;
    }

    get data(): any {
      return this[DataSymbol];
    }

    set data(data: any) {
      if (typeof data === "undefined") throw new Error("Data must be defined");
      this[DataSymbol] = data;
    }

    get status(): number {
      return this[StatusSymbol];
    }

    set status(status: number) {
      this[StatusSymbol] = status;
    }

    get errors(): any[] {
      return this[ErrorsSymbol];
    }

    set errors(errors: any[]) {
      if (!Array.isArray(errors)) throw new Error("Errors must be an array");
      this[ErrorsSymbol] = errors;
    }

    get message(): string {
      return this[MessageSymbol];
    }

    set message(message: string) {
      if (typeof message !== "string")
        throw new Error("Message must be a string");
      this[MessageSymbol] = message;
    }

    get redirect(): string {
      return this[RedirectSymbol];
    }

    set redirect(redirect: string) {
      if (typeof redirect !== "string")
        throw new Error("Redirect must be a string");
      this[RedirectSymbol] = redirect;
    }

    get downloadLink(): string {
      return this[DownloadLinkSymbol];
    }

    set downloadLink(downloadLink: string) {
      this[DownloadLinkSymbol] = downloadLink;
    }

    get access_token(): string {
      return this[AccessTokenSymbol];
    }

    set access_token(access_token: string) {
      this[AccessTokenSymbol] = access_token;
    }

    get refresh_token(): string {
      return this[RefreshTokenSymbol];
    }

    set refresh_token(refresh_token: string) {
      this[RefreshTokenSymbol] = refresh_token;
    }

    toJSON(): {
      data: any;
      status: number;
      errors: any[];
      message: string;
      redirect: string;
      downloadLink?: string;
      access_token?: string;
      refresh_token?: string;
    } {
      const responseObj :any = {
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

export default apiResponse;
