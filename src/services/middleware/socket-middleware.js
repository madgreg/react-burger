

export const socketMiddleware = (wsActions) => {
    return (store) => {
        let socket = null;

        return (next) => (action) => {
            // const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
            const { wsInit, wsSendMessage, onClose, onMessage } = wsActions;
            const { dispatch, getState } = store;
            const { type, payload } = action;
            const state = getState();
            // console.log(state.appInfo.isLoad);
            if (type === wsInit && !socket ) {
                socket = new WebSocket(payload);
            }

            if (socket) {
                socket.onopen = (event) => {
                    // dispatch({ type: "WS_CONNECTION_SUCCESS", payload: event });
                    // console.log("CONNECT");
                };

                socket.onerror = (event) => {
                    // dispatch({ type: "WS_CONNECTION_ERROR", payload: event });
                    // console.log("ERROR", event);
                };

                socket.onmessage = (event) => {
                    
                    const { data } = event;
                    const parsedData = JSON.parse(data);

                    if (parsedData.success) {
                        // const ingridient = state.burgerIngredient.burgerIngredients.filter(x=>x._id===action.payload)[0]
                        dispatch({ type: onMessage, payload: parsedData });
                        // dispatch({ type: "ordersTapeReducer/onMessage", payload: parsedData });
                    }
                };

                socket.onclose = (event) => {
                    dispatch({ type: onClose });
                };

                if (type === wsSendMessage) {
                    const message = { ...payload, token: state.userInfo.accessToken };
                    socket.send(JSON.stringify(message));
                }

                if (type === onClose) {
                    socket.close();
                    socket = null;
                }
            }

            next(action);
        };
    };
};
