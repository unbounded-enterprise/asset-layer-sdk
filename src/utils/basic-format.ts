import { BasicAnyObject } from "../types/basic-types";

export function formatArrayKey(key: string) {
    const k = encodeURIComponent(key);

    if (k.endsWith('%5B%5D')) return key;
    else return key + '%5B%5D';
}

export function formatArrayValue(key: string, value: any[]) {
    return value.reduce((a, v) => {
        if (!(v === undefined || v === '')) a.push(encodeURIComponent(v));
        return a;
    }, []).join('&' + key + '=');
}

export function basicEncode(key: string, value: any) {
    if (!key || value === undefined || value === '') return '';
    else if (Array.isArray(value)) {
        const k = formatArrayKey(key);
        const v = formatArrayValue(k, value);

        if (!v) return '';
        else return k + '=' + v;
    }
    else {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    }
}

export function propsToQueryString(props?: BasicAnyObject) {
    if (!props) return '';
    const params = new URLSearchParams();

    for (const key in props) {
        if (props[key] === undefined) continue;
        else if (Array.isArray(props[key])) props[key].forEach((value: string) => { if (value) params.append(`${key}[]`, value); });
        else params.append(key, props[key]);
    }
    
    console.log('qs:', params.toString());

    return '?' + params.toString();
}

export function propsToQueryString2(props?: BasicAnyObject) {
    if (!props) return '';
    
    const entries = Object.entries(props);
    const queryProps = [];
    for (const [key, value] of entries) {
        if (!key || value === undefined || value === '') continue;

        const encoded = basicEncode(key, value);

        if (!encoded) continue;
        else queryProps.push(encoded);
    }

    if (!queryProps.length) return '';
    const qs = queryProps.join('&');
    
    console.log('qs:', qs);

    return '?' + qs;
}