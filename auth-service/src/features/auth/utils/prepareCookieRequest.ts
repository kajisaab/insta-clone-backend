export class PrepareCookieRequest {
    constructor(
        public readonly maxAge: number,
        public readonly key: string,
        public readonly value: string | object
    ) {
    }
}
