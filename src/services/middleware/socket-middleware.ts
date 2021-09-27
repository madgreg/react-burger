import { Middleware } from "redux";
import { ORDERS_TAPE_REDUSER_ON_MESSAGE, WsActionsFull, WS_CONNECTION_CLOSE, WS_CONNECTION_START } from "services/reduсers/actions";
import { RootStore } from "services/store";

export const creatrSocketMiddleware = (): Middleware<{}, RootStore> => {
    const socketMiddleware: Middleware<{}, RootStore> = (store) => {
        let socket: WebSocket | null = null;

        return (next) => (action:WsActionsFull) => {            
            const { dispatch } = store;
            const { type } = action;
            if (type === WS_CONNECTION_START && !socket) {
                socket = new WebSocket(action.payload);
            }

            if (socket) {
                socket.onmessage = (event) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);

                    if (parsedData.success) {                        
                        dispatch({ type: ORDERS_TAPE_REDUSER_ON_MESSAGE, payload: parsedData });
                    }
                };

                socket.onclose = (event) => {
                    dispatch({ type: WS_CONNECTION_CLOSE });
                };

                // if (type === wsSendMessage) {
                //     const message = { ...payload, token: state.userInfo.accessToken };
                //     socket.send(JSON.stringify(message));
                // }

                if (type === WS_CONNECTION_CLOSE) {
                    socket.close();
                    socket = null;
                }
            }

            next(action);
        };
    };
    return socketMiddleware;
};
