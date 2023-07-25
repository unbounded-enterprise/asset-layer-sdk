export interface BasicObject<T> {
    [key:string]: T; 
}

export declare type BasicAnyObject = BasicObject<any>;