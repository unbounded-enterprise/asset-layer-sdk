export class BasicError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export interface BasicObject<T> {
    [key:string]: T; 
}

export type BasicAnyObject = BasicObject<any>;

export type BasicResultSuccess<T> = { result: T; error?: undefined; };
export type BasicResultError = { error: BasicError, result?: undefined };
export type BasicResult<T> = BasicResultSuccess<T> | BasicResultError;

export type BasicResponse<T> = {
  statusCode: number;
  success: boolean;
  body: T;
}

export type BasicSuccessResponse = { statusCode: number; success: boolean; };
export type BasicUpdatedResponse = BasicSuccessResponse & {  updated: boolean; };