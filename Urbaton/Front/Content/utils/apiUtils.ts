import {createQueryPathString} from 'utils/urlUtils';

interface IQuery {
    [key: string]: any;
}

type RequestInitWithQuery = RequestInit & { query?: IQuery };
type ErrorHandlerStatus = 'resolved' | 'rejected';
type ErrorHandler<TResult> = (reason: any, response?: Response)
    => { status: ErrorHandlerStatus, data?: TResult | PromiseLike<TResult> };

/**
 * Обертка для fetch.
 * Парсит результат в json.
 * Расширяет опции параметром query, который преобразуется в параметры адресной строки.
 * Логирует ошибки, произошедшии при отправке запроса и парсинге результата.
 * @param {RequestInfo} input - адерс
 * @param {RequestInitWithQuery} init - параметры fetch + query
 * @param {ErrorHandler<TResult>} errorHandler - обработчик ошибок. Предназначен для выдачи дефльнтного результата
 *                                              при ошибках.
 * @returns {Promise<TResult>}
 */
export function jsonFetchWithErrorLog<TResult>(
    input: RequestInfo,
    init?: RequestInitWithQuery,
    errorHandler?: ErrorHandler<TResult>,
): Promise<TResult> {
    let response: Response = null;
    const requestPromise = baseFetch(input, init)
        .then((resp) => {
            response = resp;
            return resp.json();
        });
    return addErrorHandlerToPromise<TResult>(requestPromise, errorHandler);
}

/**
 * Обертка для fetch.
 * Расширяет опции параметром query, который преобразуется в параметры адресной строки.
 * Логирует ошибки, произошедшии при отправке запроса и парсинге результата.
 * @param {RequestInfo} input - адерс
 * @param {RequestInitWithQuery} init - параметры fetch + query
 * @param {ErrorHandler<TResult>} errorHandler - обработчик ошибок. Предназначен для выдачи дефльнтного результата
 *                                              при ошибках.
 * @returns {Promise<TResult>}
 */
export function fetchWithErrorLog<TResult>(
    input: RequestInfo,
    init?: RequestInitWithQuery,
    errorHandler?: ErrorHandler<TResult>,
): Promise<TResult> {
    const requestPromise = baseFetch(input, init);
    return addErrorHandlerToPromise<TResult>(requestPromise, errorHandler);
}

function baseFetch<TResult>(
    input: RequestInfo,
    init?: RequestInitWithQuery,
): Promise<Response> {
    const inputWithOptions = typeof input === 'string'
        ? withOptions(input, init && init.query)
        : input;

    return fetch(inputWithOptions, init);
}

function withOptions(url: string, query: IQuery = {}): string {
    const optionsStr = createQueryPathString(query, 'duplicate');
    if (url.includes('?')) {
        return `${url}${optionsStr}`;
    } else {
        return `${url}?${optionsStr}`;
    }
}

function addErrorHandlerToPromise<TResult>(
    promise: Promise<any>,
    errorHandler?: ErrorHandler<TResult>,
    getResponse: () => Response = () => null,
): Promise<TResult> {
    return promise.catch((err) => {
        const response = getResponse();
        // tslint:disable:no-console
        if (!response && console.warn) {
            console.warn('Cant get response inside fetch error handler');
        }

        const handled = errorHandler && errorHandler(err, response);
        if (handled && handled.status === 'resolved') {
            return handled.data;
        }

        if (console.error) {
            const {status, url} = response || {status: undefined, url: undefined};
            console.error('status:', status, ', url:', url, err);
        }
        throw err;
    });
}

/**
 * Вовращает дефлотные результат при получении 404 статуса.
 * @param {TResult} defaultValue
 * @returns {(reason: any, response: Response) => {status: ErrorHandlerStatus; data?: PromiseLike<TResult> | TResult}}
 */
export function create404Handler<TResult>(defaultValue: TResult): ErrorHandler<TResult> {
    return (reason: any, response?: Response) => {
        if (response && response.status === 404) {
            return {status: 'resolved', data: defaultValue};
        }
        return {status: 'rejected'};
    };
}
