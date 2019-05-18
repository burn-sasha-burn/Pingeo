declare type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

declare interface IGeneralObject {
    [key: string]: any;
}

declare interface ITypedObject<T> {
    [key: string]: T;
}
