export function splitQueryString(queryString: string): { [key: string]: string } {
    const parsed: { [key: string]: string } = {};
    const valuePairs = queryString.split('&');
    valuePairs.forEach((pair) => {
        const keyValue = pair.split('=');
        if (keyValue[1] === '') {
            return;
        }
        parsed[decodeURIComponent(keyValue[0])] = decodeURIComponent(keyValue[1]);
    });
    return parsed;
}

type QueryArrayType = 'duplicate' | 'divider';

export function createQueryPathString(query: { [key: string]: any } = {}, queryArrayType?: QueryArrayType): string {
    const legalKeys = Object.keys(query).filter((key) =>
        query[key] !== undefined && `${query[key]}`,
    );
    return legalKeys
        .map((key) => createQueryParameter(key, query[key], queryArrayType))
        .join('&');
}

function createQueryParameter(key: string, value: any, queryArrayType: QueryArrayType = 'divider'): string {
    const encodedKey = encodeURIComponent(key);
    if (Array.isArray(value)) {
        return createArrayQueryParameter(encodedKey, value, queryArrayType);
    } else {
        return `${encodedKey}=${encodeURIComponent(value)}`;
    }
}

function createArrayQueryParameter(
    encodedKey: string,
    array: any[],
    queryArrayType: QueryArrayType = 'divider',
): string {
    const divider = queryArrayType === 'divider' ? ',' : `&${encodedKey}=`;
    return `${encodedKey}=${array.map((item) => encodeURIComponent(item)).join(divider)}`;
}
