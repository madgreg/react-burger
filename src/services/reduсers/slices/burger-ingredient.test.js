jest.mock("../api");

import {
    burgerIngredientReducer,
    initBurgerIngredientState,
    loadBurgerIngredient,
    selectBurgerIngredients,
    selectCurrentTab,
    selectCurrentViewIngredient,
    selectIsModal,
} from "./burger-ingredient";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const actions = burgerIngredientReducer.actions;

describe("burgerIngredientReducer", () => {
    it("проверка инициализации стайта при старте редюсера", () => {
        const nextState = initBurgerIngredientState;
        const result = burgerIngredientReducer.reducer(undefined, {});
        expect(result).toEqual(nextState);
    });

    it("setModal", () => {
        const testValue = true;
        const nextState = burgerIngredientReducer.reducer(initBurgerIngredientState, actions.setModal(testValue));
        const rootState = { burgerIngredient: nextState };
        expect(selectIsModal(rootState)).toEqual(true);
    });

    it("setCurrentViewIngredient", () => {
        const testValue = 1;
        const model = {
            _id: 1,
            name: "testIngredient",
        };
        const nextState = burgerIngredientReducer.reducer(
            { ...initBurgerIngredientState, burgerIngredients: [model] },
            actions.setCurrentViewIngredient(testValue)
        );
        const rootState = { burgerIngredient: nextState };
        expect(selectCurrentViewIngredient(rootState)).toEqual(model);
    });

    it("setData", () => {
        const model = {
            _id: 1,
            name: "testIngredient",
        };
        const testValue = [model];

        const nextState = burgerIngredientReducer.reducer(initBurgerIngredientState, actions.setData(testValue));

        const rootState = { burgerIngredient: nextState };
        expect(selectBurgerIngredients(rootState)).toEqual(testValue);
    });

    it("setTab", () => {
        const testValue = 1;
        const nextState = burgerIngredientReducer.reducer(initBurgerIngredientState, actions.setTab(testValue));

        const rootState = { burgerIngredient: nextState };
        expect(selectCurrentTab(rootState)).toEqual(testValue);
    });

    it("loadBurgerIngredient", async () => {
        const store = mockStore(initBurgerIngredientState);
        await store.dispatch(loadBurgerIngredient());

        expect(store.getActions().length).toEqual(2);
    });
    
});
