import { BasicAnyObject } from "../types/basic-types";

export function propsToQueryString(props: BasicAnyObject) {
    const params = new URLSearchParams();

    for (const key in props) {
        if (Array.isArray(props[key])) props[key].forEach((value: string) => params.append(key, value));
        else params.append(key, props[key]);
    }
    
    return '?' + params.toString();
}