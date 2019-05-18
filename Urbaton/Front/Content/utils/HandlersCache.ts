export class HandlersCache<T> {
    private handlersMap: { [key: string]: () => void } = {};

    constructor(private handler: (arg: T) => void) {
    }

    public getHandler(key: string, value: T): () => void {
        if (!this.handlersMap[key]) {
            this.handlersMap[key] = () => this.handler(value);
        }
        return this.handlersMap[key];
    }
}
