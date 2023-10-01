export interface Decorator<R, V> {
    decorate(target: R, data: V): Promise<void>;
};
