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
export type BasicResultError = { error: BasicError; result?: undefined; };
export type BasicResult<T> = BasicResultSuccess<T> | BasicResultError;


export type BasicSuccessResponse = { statusCode: number; success: boolean; };
export type BasicResponse<T> = BasicSuccessResponse & { body: T; }
export type BasicUpdatedResponse = BasicSuccessResponse & { updated: boolean; };
export type BasicConditionalResult<T, K extends keyof T, P, RT, RF> = T[K] extends P ? RT : RF;
export type BasicConditionalExtResult<T, K1 extends keyof T, P1, R1, K2 extends keyof T, P2, R2> = T[K1] extends P1 ? R1 : T[K2] extends P2 ? R2 : R1 | R2;
export type BasicConditionalBoolResult<T, K extends keyof T, RT, RF> = T[K] extends true ? RT : T[K] extends false ? RF : RT | RF;