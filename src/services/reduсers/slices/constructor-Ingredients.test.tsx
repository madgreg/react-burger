import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import { burgerIngredientConstructorInitState, burgerIngredientConstructorReducer, selectOrderId, selectOrderSum } from "./constructor-Ingredients";
import { getOrder } from "./orders-tape";
import { TBurgerIngredientConstructorInitStateType, TIngrediensTypes } from "types";
import { mainUrl } from "utils/vars";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const actions = burgerIngredientConstructorReducer.actions;
const ingred: TIngrediensTypes = {
    _id: "",
    name: "",
    type: "",
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 1,
    price: 12,
    image: "",
    image_mobile: "",
    image_large: "",
    __v: 1,
};

describe("ordersTapeReducer", () => {
    afterEach(() => {
        fetchMock.restore();
    });

    it("проверка инициализации стайта при старте редюсера", () => {
        const nextState = burgerIngredientConstructorInitState;
        const result = burgerIngredientConstructorReducer.reducer(undefined, { type: "" });
        expect(result).toEqual(nextState);
    });

    it("sendOrder", async () => {
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
        fetchMock.getOnce(mainUrl + "/orders/" + orderN, {
            body: expectedState,
            headers: { "content-type": "application/json" },
        });

        // const expectedActions = [{ type: "ordersTapeReducer/setCurentOrder", payload: expectedState.orders }];

        await store.dispatch(getOrder(orderN));
        // expect(store.getActions()).toEqual([]);
        expect(store.getActions().length).toEqual(2);
    });

    it("resetOrder", () => {
        const testValue = {
            ...burgerIngredientConstructorInitState,
            orderSum: 10,
            orderId: 15,
        };
        const nextState = burgerIngredientConstructorReducer.reducer(testValue, actions.resetOrder());
        expect(nextState).toEqual(burgerIngredientConstructorInitState);
    });

    it("setOrderId", () => {
        const testValue = 1;

        const nextState = burgerIngredientConstructorReducer.reducer(burgerIngredientConstructorInitState, actions.setOrderId(testValue));
        const rootState = { burgerIngredientConstructor: nextState };
        expect(selectOrderId(rootState)).toEqual(testValue);
    });

    it("resetSummOrder", () => {
        const testValue = 0;

        const nextState = burgerIngredientConstructorReducer.reducer({ ...burgerIngredientConstructorInitState, orderSum: 10 }, actions.resetSummOrder());
        const rootState = { burgerIngredientConstructor: nextState };
        expect(selectOrderSum(rootState)).toEqual(testValue);
    });

    it("setSummOrder", () => {
        const testValue = 4;

        

        const tmpState: TBurgerIngredientConstructorInitStateType = {
            ...burgerIngredientConstructorInitState,
            order: {
                bun: [{ ...ingred, price: 1 }, { ...ingred, price: 1 }],
                ingredients: [{ ...ingred, price: 1 }, { ...ingred, price: 1 }],
            },
        };

        const nextState = burgerIngredientConstructorReducer.reducer(tmpState, actions.setSummOrder());
        const rootState = { burgerIngredientConstructor: nextState };
        expect(selectOrderSum(rootState)).toEqual(testValue);
    });

    it("addIngredient", () => {
        const testValue = {
            ...burgerIngredientConstructorInitState,
            order: {
                bun: [{ ...ingred, type: "bun" }, { ...ingred, type: "bun" }],
                ingredients: [{ ...ingred, type: "soil" }, { ...ingred, type: "soil" }],
            },
        };

        const ingredients:TIngrediensTypes[] = [{ ...ingred, type: "soil" }, { ...ingred, type: "soil" }, { ...ingred, type: "bun" }, { ...ingred, type: "bun" }];
        let nextState = burgerIngredientConstructorInitState;
        ingredients.forEach((x) => {
            nextState = burgerIngredientConstructorReducer.reducer(nextState, actions.addIngredient(x));
        });
        
        expect(nextState).toEqual(testValue);
    });

    it("delIngredient", () => {
        const testValue = {
            ...burgerIngredientConstructorInitState,
            order: {
                bun: [{ ...ingred, type: "bun" }, { ...ingred, type: "bun" }],
                ingredients: [{ ...ingred, type: "soil" }, { ...ingred, type: "soil" }],
            },
        };

        const testValue1 = {
            ...burgerIngredientConstructorInitState,
            order: {
                bun: [{ ...ingred, type: "bun" }, { ...ingred, type: "bun" }],
                ingredients: [{ ...ingred, type: "soil" }],
            },
        };

        const nextState = burgerIngredientConstructorReducer.reducer(testValue, actions.delIngredient(0));
        expect(nextState).toEqual(testValue1);
    });

    it("chagneIngredientPosition", () => {
        const testValue = {
            ...burgerIngredientConstructorInitState,
            order: {
                bun: [{ ...ingred, type: "bun" }, { ...ingred, type: "bun" }],
                ingredients: [
                    { ...ingred, type: "soil", id: 0 },
                    { ...ingred, type: "soil", id: 1 },
                ],
            },
        };

        const testValue1 = {
            ...burgerIngredientConstructorInitState,
            order: {
                bun: [{ ...ingred, type: "bun" }, { ...ingred, type: "bun" }],
                ingredients: [
                    { ...ingred, type: "soil", id: 1 },
                    { ...ingred, type: "soil", id: 0 },
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
