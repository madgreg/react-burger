import { combineReducers } from "redux";
import { appReducer } from "./slices/app";
import { burgerIngredientReducer } from "./slices/burger-ingredient";
import { burgerIngredientConstructorReducer } from "./slices/constructor-Ingredients";
import { ordersTapeReducer } from "./slices/orders-tape";
import { userInfoReducer } from "./slices/user-Info";
import { userOrdersReducer } from "./slices/user-orders";




// rootReduser
export const rootReducer = combineReducers({
    burgerIngredient: burgerIngredientReducer.reducer,
    burgerIngredientConstructor: burgerIngredientConstructorReducer.reducer,
    userInfo: userInfoReducer.reducer,
    appInfo: appReducer.reducer,
    ordersTape: ordersTapeReducer.reducer,
    userOrders: userOrdersReducer.reducer
});
