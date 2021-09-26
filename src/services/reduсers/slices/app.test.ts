import { appReducer } from "./app";

describe("AppReducer action creators", () => {
    const actions = appReducer.actions;
    it("setLoad", () => {        
        const testValue = true;
        
        const expectedAction = {
            type: "appReducer/setLoad",
            payload: testValue,
        };
        
        expect(actions.setLoad(testValue)).toEqual(expectedAction);
    });

    it("setActivePage", () => {        
        const testValue = 2;    
        const expectedAction = {
            type: "appReducer/setActivePage",
            payload: testValue,
        };
        
        expect(actions.setActivePage(testValue)).toEqual(expectedAction);
    });

    it("setTmpFg", () => {            
        const expectedAction = {
            type: "appReducer/setTmpFg"
        };
        
        expect(actions.setTmpFg()).toEqual(expectedAction);
    });
});
