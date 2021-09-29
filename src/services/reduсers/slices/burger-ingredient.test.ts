import { TIngrediensTypes } from "types";
import {
    burgerIngredientReducer,
    initBurgerIngredientState,    
    selectCurrentTab,
    selectCurrentViewIngredient,
    selectIsModal,
} from "./burger-ingredient";


const actions = burgerIngredientReducer.actions;
const ingred: TIngrediensTypes = {
    _id: "1",
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

describe("burgerIngredientReducer", () => {
    it("проверка инициализации стайта при старте редюсера", () => {
        const nextState = initBurgerIngredientState;
        const result = burgerIngredientReducer.reducer(undefined, {type: ''});
        expect(result).toEqual(nextState);
    });

    it("setModal", () => {
        const testValue = true;
        const nextState = burgerIngredientReducer.reducer(initBurgerIngredientState, actions.setModal(testValue));
        const rootState = { burgerIngredient: nextState };
        expect(selectIsModal(rootState)).toEqual(true);
    });

    it("setCurrentViewIngredient", () => {
        const testValue = '1';
        const model = ingred;
        const nextState = burgerIngredientReducer.reducer(
            { ...initBurgerIngredientState, burgerIngredients: [ingred] },
            actions.setCurrentViewIngredient(testValue)
        );
        const rootState = { burgerIngredient: nextState };
        expect(selectCurrentViewIngredient(rootState)).toEqual(model);
    });
    

    it("setTab", () => {
        const testValue = '1';
        const nextState = burgerIngredientReducer.reducer(initBurgerIngredientState, actions.setTab(testValue));

        const rootState = { burgerIngredient: nextState };
        expect(selectCurrentTab(rootState)).toEqual(testValue);
    });

    // it("loadBurgerIngredient", async () => {
    //     const store = mockStore(initBurgerIngredientState);
    //     await store.dispatch(loadBurgerIngredient());

    //     expect(store.getActions().length).toEqual(2);
    // });
    
});
