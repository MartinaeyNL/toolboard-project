/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Dashboard {
  createdAt?: string;
  description?: string;
  displayName?: string;
  id?: number;
  updatedAt?: string;
  widgets?: DashboardWidget[];
}

/** Widget inside a Dashboard */
export interface DashboardWidget {
  createdAt?: string;
  dashboardId?: number;
  description?: string;
  displayName?: string;
  id?: number;
  /** Location of a widget inside a Dashboard */
  location?: DashboardWidgetLocation;
  locationId?: number;
  updatedAt?: string;
  widget?: Widget;
  widgetId?: number;
}

/** Location of a widget inside a Dashboard */
export interface DashboardWidgetLocation {
  MaxWidth?: number;
  createdAt?: string;
  height?: number;
  id?: number;
  maxHeight?: number;
  minHeight?: number;
  minWidth?: number;
  updatedAt?: string;
  width?: number;
  x?: number;
  y?: number;
}

export interface Widget {
  id?: string;
  installPath?: string;
  widgetJSON?: string;
}

export namespace Dashboard {
  /**
   * @description Stores the body dashboard object as a new entry in the database
   * @tags dashboard
   * @name PostDashboard
   * @summary Create a new Dashboard
   * @request POST:/dashboard
   */
  export namespace PostDashboard {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = Dashboard;
    export type RequestHeaders = {};
    export type ResponseBody = Dashboard;
  }
  /**
   * @description Returns one json object with all dashboards in the database
   * @tags dashboard
   * @name GetDashboard
   * @summary Get all dashboards
   * @request GET:/dashboard/all
   */
  export namespace GetDashboard {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Dashboard[];
  }
  /**
   * @description Checks the ID in the database, and deletes that entry if present
   * @tags dashboard
   * @name DeleteDashboard
   * @summary Delete a dashboard
   * @request DELETE:/dashboard/{id}
   */
  export namespace DeleteDashboard {
    export type RequestParams = {
      /** Dashboard ID */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
}

export namespace Widget {
  /**
   * @description Returns one json object with all available widgets
   * @tags widget
   * @name GetWidget
   * @summary Get all widgets, locally and externally
   * @request GET:/widget/all
   */
  export namespace GetWidget {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Widget[];
  }
  /**
   * @description Returns html of the Widget with the smae ID
   * @tags widget
   * @name EmbedDetail
   * @summary Get HTML of a Widget
   * @request GET:/widget/embed/{id}/{file}
   */
  export namespace EmbedDetail {
    export type RequestParams = {
      /** Widget ID */
      id: string;
      /** Optional file name */
      file?: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
  /**
   * @description Returns a json object of the Widget with the smae ID
   * @tags widget
   * @name WidgetDetail
   * @summary Get widget by ID
   * @request GET:/widget/{id}
   */
  export namespace WidgetDetail {
    export type RequestParams = {
      /** Widget ID */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Widget;
  }
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "//localhost:8080/api/v1";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Toolboard API
 * @version 1.0
 * @baseUrl //localhost:8080/api/v1
 * @contact
 *
 * Documentation for the exposed HTTP API.
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  dashboard = {
    /**
     * @description Stores the body dashboard object as a new entry in the database
     *
     * @tags dashboard
     * @name PostDashboard
     * @summary Create a new Dashboard
     * @request POST:/dashboard
     */
    postDashboard: (dashboard: Dashboard, params: RequestParams = {}) =>
      this.request<Dashboard, void>({
        path: `/dashboard`,
        method: "POST",
        body: dashboard,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns one json object with all dashboards in the database
     *
     * @tags dashboard
     * @name GetDashboard
     * @summary Get all dashboards
     * @request GET:/dashboard/all
     */
    getDashboard: (params: RequestParams = {}) =>
      this.request<Dashboard[], void>({
        path: `/dashboard/all`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Checks the ID in the database, and deletes that entry if present
     *
     * @tags dashboard
     * @name DeleteDashboard
     * @summary Delete a dashboard
     * @request DELETE:/dashboard/{id}
     */
    deleteDashboard: (id: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/dashboard/${id}`,
        method: "DELETE",
        ...params,
      }),
  };
  widget = {
    /**
     * @description Returns one json object with all available widgets
     *
     * @tags widget
     * @name GetWidget
     * @summary Get all widgets, locally and externally
     * @request GET:/widget/all
     */
    getWidget: (params: RequestParams = {}) =>
      this.request<Widget[], void>({
        path: `/widget/all`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns html of the Widget with the smae ID
     *
     * @tags widget
     * @name EmbedDetail
     * @summary Get HTML of a Widget
     * @request GET:/widget/embed/{id}/{file}
     */
    embedDetail: (id: string, file?: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/widget/embed/${id}/${file}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Returns a json object of the Widget with the smae ID
     *
     * @tags widget
     * @name WidgetDetail
     * @summary Get widget by ID
     * @request GET:/widget/{id}
     */
    widgetDetail: (id: string, params: RequestParams = {}) =>
      this.request<Widget, void>({
        path: `/widget/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
