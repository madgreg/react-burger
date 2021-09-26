import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import { burgerIngredientConstructorReducer, burgerIngredientInitState, selectOrderId, selectOrderSum } from "./constructor-Ingredients";
import { getOrder } from "./orders-tape";


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const actions = burgerIngredientConstructorReducer.actions;

describe("ordersTapeReducer", () => {
    afterEach(() => {
        fetchMock.restore();
    });

    it("проверка инициализации стайта при старте редюсера", () => {
        const nextState = burgerIngredientInitState;
        const result = burgerIngredientConstructorReducer.reducer(undefined, {});
        expect(result).toEqual(nextState);
    });

    it("sendOrder", () => {
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

        // const expectedActions = [{ type: "ordersTapeReducer/setCurentOrder", payload: expectedState.orders }];

        return store.dispatch(getOrder(orderN)).then(() => {
            expect(store.getActions()).toEqual([]);
        });
    });

    it("resetOrder", () => {
        const testValue = {
            ...burgerIngredientInitState,
            orderSum: 10,
            orderId: 15,
        };
        const nextState = burgerIngredientConstructorReducer.reducer(testValue, actions.resetOrder());
        expect(nextState).toEqual(burgerIngredientInitState);
    });

    it("setOrderId", () => {
        const testValue = 1;

        const nextState = burgerIngredientConstructorReducer.reducer(burgerIngredientInitState, actions.setOrderId(testValue));
        const rootState = { burgerIngredientConstructor: nextState };
        expect(selectOrderId(rootState)).toEqual(testValue);
    });

    it("resetSummOrder", () => {
        const testValue = 0;

        const nextState = burgerIngredientConstructorReducer.reducer({ ...burgerIngredientInitState, orderSum: 10 }, actions.resetSummOrder());
        const rootState = { burgerIngredientConstructor: nextState };
        expect(selectOrderSum(rootState)).toEqual(testValue);
    });

    it("setSummOrder", () => {
        const testValue = 4;
        const tmpState = {
            ...burgerIngredientInitState,
            order: {
                bun: [{ price: 1 }, { price: 1 }],
                ingredients: [{ price: 1 }, { price: 1 }],
            },
        };

        const nextState = burgerIngredientConstructorReducer.reducer(tmpState, actions.setSummOrder());
        const rootState = { burgerIngredientConstructor: nextState };
        expect(selectOrderSum(rootState)).toEqual(testValue);
    });

    it("addIngredient", () => {
        const testValue = {
            ...burgerIngredientInitState,
            order: {
                bun: [{ type: "bun" }, { type: "bun" }],
                ingredients: [{ type: "soil" }, { type: "soil" }],
            },
        };

        const ingredients = [{ type: "soil" }, { type: "soil" }, { type: "bun" }, { type: "bun" }];
        let nextState = burgerIngredientInitState;
        ingredients.forEach((x) => {
            nextState = burgerIngredientConstructorReducer.reducer(nextState, actions.addIngredient(x));
        });

        expect(nextState).toEqual(testValue);
    });

    it("delIngredient", () => {
        const testValue = {
            ...burgerIngredientInitState,
            order: {
                bun: [{ type: "bun" }, { type: "bun" }],
                ingredients: [{ type: "soil" }, { type: "soil" }],
            },
        };

        const testValue1 = {
            ...burgerIngredientInitState,
            order: {
                bun: [{ type: "bun" }, { type: "bun" }],
                ingredients: [{ type: "soil" }],
            },
        };

        const nextState = burgerIngredientConstructorReducer.reducer(testValue, actions.delIngredient(0));
        expect(nextState).toEqual(testValue1);
    });

    it("chagneIngredientPosition", () => {
        const testValue = {
            ...burgerIngredientInitState,
            order: {
                bun: [{ type: "bun" }, { type: "bun" }],
                ingredients: [
                    { type: "soil", id: 0 },
                    { type: "soil", id: 1 },
                ],
            },
        };

        const testValue1 = {
            ...burgerIngredientInitState,
            order: {
                bun: [{ type: "bun" }, { type: "bun" }],
                ingredients: [
                    { type: "soil", id: 1 },
                    { type: "soil", id: 0 },
                ],
            },
        };

        const nextState = burgerIngredientConstructorReducer.reducer(
            testValue,
            actions.chagneIngredientPosition({
                hoverIndex: 0,
                dragIndex: 1,
            })
        );
        expect(nextState).toEqual(testValue1);
    });
});
