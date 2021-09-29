import { selectCurentOrder, userOrdersReducer, userOrdersReducerInitState } from "./user-orders";

const actions = userOrdersReducer.actions;

describe("userOrdersReducer", () => {
    it("проверка инициализации стайта при старте редюсера", () => {
        const nextState = userOrdersReducerInitState;
        const result = userOrdersReducer.reducer(undefined, {type:''});
        expect(result).toEqual(nextState);
    });

    it("setCurentOrder", () => {
        const tmpOrd = {
            _id: "",
            ingredients: [],
            owner: "string",
            status: "string",
            name: "string",
            createdAt: "string",
            updatedAt: "s",
            number: 1,
            __v: 0,
        };
        const testValue1 = {
            userOrders: {
                curentOrder: tmpOrd,
            },
        };

        const nextState = userOrdersReducer.reducer(userOrdersReducerInitState, actions.setCurentOrder(tmpOrd));
        const rootState = { userOrders: nextState };
        expect(selectCurentOrder(rootState)).toEqual(selectCurentOrder(testValue1));
    });
});
