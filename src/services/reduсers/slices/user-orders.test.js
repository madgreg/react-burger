import { selectCurentOrder, userOrdersReducer, userOrdersReducerInitState } from "./user-orders";

const actions = userOrdersReducer.actions;

describe("userOrdersReducer", () => {
    it("проверка инициализации стайта при старте редюсера", () => {
        const nextState = userOrdersReducerInitState;
        const result = userOrdersReducer.reducer(undefined, {});
        expect(result).toEqual(nextState);
    });

    it("setCurentOrder", () => {        

        const testValue1 = {
            userOrders: { curentOrder: { name: "test" } },
        };

        const nextState = userOrdersReducer.reducer(userOrdersReducerInitState, actions.setCurentOrder({ name: "test" }));
        const rootState = { userOrders: nextState };
        expect(selectCurentOrder(rootState)).toEqual(selectCurentOrder(testValue1));

        
    });
});
