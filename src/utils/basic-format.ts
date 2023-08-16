import { BasicAnyObject } from "../types/basic-types";

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