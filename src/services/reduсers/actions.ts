export const WS_CONNECTION_START = "WS_CONNECTION_START";
export const WS_CONNECTION_CLOSE = "WS_CONNECTION_CLOSE";
export const ORDERS_TAPE_REDUSER_ON_MESSAGE = "ordersTapeReducer/onMessage";

export type WsConnectionStart = {
    type: typeof WS_CONNECTION_START;
    payload: string | any;
};

export type WsConnectionClose = {
    type: typeof WS_CONNECTION_CLOSE;    
};

export type OrdersTapeReducerOnMessage = {
    type: typeof ORDERS_TAPE_REDUSER_ON_MESSAGE;    
};

export type WsActionsFull = WsConnectionStart | WsConnectionClose | OrdersTapeReducerOnMessage;
