// import { TIconProps } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";

import { ReactChild } from "react";

export type TIngrediensTypes = {
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

export type TConstructorIngredientsOrder = {
    bun: TIngrediensTypes[];
    ingredients: TIngrediensTypes[];
};
export type TBurgerIngredientConstructorInitStateType = {
    isLoad: boolean;
    orderSum: number;
    orderId: number | null;
    order: TConstructorIngredientsOrder;
};

export type TOrderSort = {
    dragIndex: number;
    hoverIndex: number;
};
export type TInitBurgerIngredientStateType = {
    isModal: boolean;
    currentTab: string;
    burgerIngredients: TIngrediensTypes[];
    currentViewIngredient: TIngrediensTypes | null;
    isLoad: boolean;
};

export type TSendOrderArg = {
    order: TConstructorIngredientsOrder;
    accessToken: string | null;
};

export type TOrderSendResponse = {
    success: boolean;
    name: string;
    order: {
        ingredients: TIngrediensTypes[];
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

export type TInitStateOrdersTapeReducerType = {
    curentOrder: TOrderType | null;
    orderList: TOrderType[];
};

export type TUserOrdersReducerInitStateType = Omit<TInitStateOrdersTapeReducerType, 'orderList'>

export type TOrderType = {
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

export type TGetOrderTapeResponse = {
    success: boolean;
    orders: TOrderType[];
};

export type TInitappReducerStateType = {
    tmpFg: number;
    isLoad: boolean;
    activePage: string;
};

export type TInitStateUserInfoReducerType = {
    isLoad: boolean;
    redirectTo: string | null;
    isAuth: boolean;
    name: string | null;
    email: string | null;
    accessToken: string | null;
};

export type TUserInfoArg = {
    name: string;
    email: string;
};

export type TLogInResponse = {
    success: boolean;
    accessToken: string;
    refreshToken: string;    
    user: TUserInfoArg;
};

export type TUpdateUserInfoResponse = Omit<TLogInResponse, "accessToken" | "refreshToken">;
export type TRefreshTokenResponse = Omit<TLogInResponse, "user">;

export type TUpdateUserInforArg = {
    form: string;
    accessToken: string;
};

export type TRegistrationFormType = {
    email: string; 
    password: string; 
    name: string; 
} 

export type TResetPaswordForm = {
    password: string;
    token: string;
}

type TIconTypes = 'secondary' | 'primary' | 'error' | 'success';

export type THeaderButton = {
    iconName:string;
    iconType:TIconTypes;
    inActive?: number; 
    first?: number; 
    children: ReactChild; 
    onClick?: (e:React.MouseEvent)=>void;
} 

export type TModal = {
    children: ReactChild; 
    onClose: any; ///разобраться с фенкциями
    title: string; 
    titleSize?: string;
    marginCls?: string;
};

export type TModalOverlay = {
    children: ReactChild, 
    onClick: any
};

export type TOrderDetails = {    
    orderId: string;
};
