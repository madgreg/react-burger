import { burgerIngredientReducer, initBurgerIngredientState, selectIsModal } from "./burger-ingredient";

describe("burgerIngredientReducer", () => {
    const actions = burgerIngredientReducer.actions;
    describe("reducer, actions and selectors", () => {
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

        // it('should properly set the state when sign in is made', () => {
        //   // Arrange
        //   const data = {
        //     userName: 'John Doe',
        //     token: 'This is a valid token. Trust me!',
        //   };

        //   // Act
        //   const nextState = burgerIngredientReducer.reducer(initBurgerIngredientState, signIn(data));

        //   // Assert
        //   const rootState = { auth: nextState };
        //   expect(selectIsAuthenticated(rootState)).toEqual(true);
        //   expect(selectUserName(rootState)).toEqual(data.userName);
        //   expect(selectToken(rootState)).toEqual(data.token);
        // });
    });
});

// import configureMockStore from "redux-mock-store";
// import thunk from "redux-thunk";
// import fetchMock from "fetch-mock";
// import { burgerIngredientReducer } from "./burger-ingredient";

// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);

// describe("async actions", () => {
//     const { actions } = burgerIngredientReducer;
//     afterEach(() => {
//         fetchMock.restore();
//     });

//     // it("creates FETCH_TODOS_SUCCESS when fetching todos has been done", () => {
//     //     fetchMock.getOnce("/todos", {
//     //         body: { todos: ["do something"] },
//     //         headers: { "content-type": "application/json" },
//     //     });

//     //     const expectedActions = [{ type: types.FETCH_TODOS_REQUEST }, { type: types.FETCH_TODOS_SUCCESS, body: { todos: ["do something"] } }];
//     //     const store = mockStore({ todos: [] });

//     //     return store.dispatch(actions.fetchTodos()).then(() => {
//     //         // Возвращаем асинхронный экшен
//     //         expect(store.getActions()).toEqual(expectedActions);
//     //     });
//     // });

//     it('should set received order to store', async  ()  => {
//         return function() {
//         const store = mockStore(initialState);
//         const payload = { _id: 123, number: 456, ingredients: [] }
//         store.dispatch(setOrderInfo(payload));
//         const { order } = store.getState();
//         expect(order).toEqual(payload);
//         }
//       });
//     });

// });
