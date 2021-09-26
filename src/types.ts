export type ingrediensPropTypes = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
};

export type constructorIngredientsOrder = {
    bun: ingrediensPropTypes[];
    ingredients: ingrediensPropTypes[];
};
export type burgerIngredientConstructorInitStateType = {
    isLoad: boolean;
    orderSum: number;
    orderId: number | null;
    order: constructorIngredientsOrder;
};

export type OrderSort = {
    dragIndex: number;
    hoverIndex: number;
};
export type initBurgerIngredientStateType = {
    isModal: boolean;
    currentTab: string;
    burgerIngredients: ingrediensPropTypes[];
    currentViewIngredient: ingrediensPropTypes | null;
    isLoad: boolean;
};

export type sendOrderArg = {
    order: constructorIngredientsOrder;
    accessToken: string | null;
};

export type orderSendResponse = {
    success: boolean;
    name: string;
    order: {
        ingredients: ingrediensPropTypes[];
        _id: string;
        owner: {
            name: string;
            email: string;
            createdAt: string;
            updatedAt: string;
        };
        status: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        number: number;
        price: number;
    };
};

export type initStateOrdersTapeReducerType = {
    curentOrder: orderType | null;
    orderList: orderType[];
};

export type userOrdersReducerInitStateType = Omit<initStateOrdersTapeReducerType, 'orderList'>

export type orderType = {
    _id: string;
    ingredients: string[];
    owner: string;
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
    __v: number;
};

export type getOrderOrdersTapeResponse = {
    success: boolean;
    orders: orderType[];
};

export type initappReducerStateType = {
    tmpFg: number;
    isLoad: boolean;
    activePage: string;
};

export type initStateUserInfoReducerType = {
    isLoad: boolean;
    redirectTo: string | null;
    isAuth: boolean;
    name: string | null;
    email: string | null;
    accessToken: string | null;
};

export type userInfoArg = {
    name: string;
    email: string;
};

export type logInResponse = {
    success: boolean;
    accessToken: string;
    refreshToken: string;    
    user: userInfoArg;
};

export type updateUserInfoResponse = Omit<logInResponse, "accessToken" | "refreshToken">;
export type refreshTokenResponse = Omit<logInResponse, "user">;

export type updateUserInforArg = {
    form: string;
    accessToken: string;
};

export type registrationFormType = {
    email: string; 
    password: string; 
    name: string; 
} 

export type resetPaswordForm = {
    password: string;
    token: string;
}

