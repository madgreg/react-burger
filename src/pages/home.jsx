import BurgerConstructor from "components/burger-constructor/burger-constructor";
import BurgerIngredients from "components/burger-ingredients/burger-ingredients";
import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch } from "react-redux";
import { appReducer } from "services/reduсers/slices/app";

const HomePage = () => { 
    const dispatch = useDispatch()  
    useEffect(()=>{
        dispatch(appReducer.actions.setActivePage('home'))
    },[dispatch])
    return (
        <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
        </DndProvider>
    );
};

export default HomePage;
