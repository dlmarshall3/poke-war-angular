export function fireEvent(eventName: string, payload: any, target: any = document){
    const event = new CustomEvent(eventName, {
        bubbles: true,
        composed: true,
        detail: {...payload}
    });
    target?.dispatchEvent(event);
}