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

export type BasicResultSuccess<T> = { result: T };
export type BasicResultError = { error: BasicError };
export type BasicResult<T> = BasicResultSuccess<T> | BasicResultError;