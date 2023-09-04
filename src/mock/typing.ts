export interface MockParams {
    url: string;
    type: string;
    data?: any;
    params?: any;
    response(option?: MockResParams): Record<string, unknown>;
}
export interface MockResParams {
    url:string;
    type:string;
    body:any;
}
