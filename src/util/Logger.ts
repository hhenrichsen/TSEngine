const debug = false;

export function log(message: any, ...params: any[]) {
    if (debug) {
        console.log(message, params);
    }
}

export function warn(message: any, ...params: any[]) {
    if (debug) {
        console.warn(message, params);
    }
}
