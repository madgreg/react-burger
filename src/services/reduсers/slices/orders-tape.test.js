import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import { getOrder, initStateOrdersTapeReducer, ordersTapeReducer, selectCurentOrder, selectOrderList } from "./orders-tape";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const actions = ordersTapeReducer.actions;

describe("ordersTapeReducer", () => {
    afterEach(() => {
        fetchMock.restore();
    });

    it("проверка инициализации стайта при старте редюсера", () => {
        const nextState = initStateOrdersTapeReducer;
        const result = ordersTapeReducer.reducer(undefined, {});
        expect(result).toEqual(nextState);
    });

    it("setCurentOrder", () => {
        const testValue = {
            _id: "614af0d4dab0f3001bb07562",
            ingredients: ["60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733c7"],
            owner: "6141ea8a3608f0001eb933bb",
            status: "done",
            name: "Флюоресцентный бургер",
            createdAt: "2021-09-22T09:01:08.780Z",
            updatedAt: "2021-09-22T09:01:08.872Z",
            number: 3730,
            __v: 0,
        };
        const nextState = ordersTapeReducer.reducer(initStateOrdersTapeReducer, actions.onMessage(testValue));
        const rootState = { ordersTape: nextState };        
        expect(selectOrderList(rootState)).toEqual(testValue);
    });

    it("onMessage", () => {
        const testValue = {
            _id: "614af0d4dab0f3001bb07562",
            ingredients: ["60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733c7"],
            owner: "6141ea8a3608f0001eb933bb",
            status: "done",
            name: "Флюоресцентный бургер",
            createdAt: "2021-09-22T09:01:08.780Z",
            updatedAt: "2021-09-22T09:01:08.872Z",
            number: 3730,
            __v: 0,
        };
        const nextState = ordersTapeReducer.reducer(initStateOrdersTapeReducer, actions.setCurentOrder(testValue));
        const rootState = { ordersTape: nextState };
        // console.log(rootState)
        expect(selectCurentOrder(rootState)).toEqual(testValue);
    });

    it("getOrder", () => {
        const orderN = 1234;
        const expectedState = {
            success: true,
            orders: [
                {
                    _id: "614af0d4dab0f3001bb07562",
                    ingredients: ["60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733c7"],
                    owner: "6141ea8a3608f0001eb933bb",
                    status: "done",
                    name: "Флюоресцентный бургер",
                    createdAt: "2021-09-22T09:01:08.780Z",
                    updatedAt: "2021-09-22T09:01:08.872Z",
                    number: 3730,
                    __v: 0,
                },
            ],
        };

        const store = mockStore({});
        fetchMock.getOnce("https://norma.nomoreparties.space/api/orders/" + orderN, {
            body: expectedState,
            headers: { "content-type": "application/json" },
        });

        const expectedActions = [{ type: "ordersTapeReducer/setCurentOrder", payload: expectedState.orders }];

        return store.dispatch(getOrder(orderN)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it("getOrderSuccessFalse", () => {
        const orderN = 1234;
        const expectedState = {
            success: false,
            orders: [
                {
                    _id: "614af0d4dab0f3001bb07562",
                    ingredients: ["60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733c7"],
                    owner: "6141ea8a3608f0001eb933bb",
                    status: "done",
                    name: "Флюоресцентный бургер",
                    createdAt: "2021-09-22T09:01:08.780Z",
                    updatedAt: "2021-09-22T09:01:08.872Z",
                    number: 3730,
                    __v: 0,
                },
            ],
        };

        const store = mockStore({});
        fetchMock.getOnce("https://norma.nomoreparties.space/api/orders/" + orderN, {
            body: expectedState,
            headers: { "content-type": "application/json" },
        });

        const expectedActions = [{ type: "ordersTapeReducer/setCurentOrder", payload: expectedState.orders }];

        return store.dispatch(getOrder(orderN)).then(() => {
            expect(store.getActions()).toEqual([]);
        });
    });
});
