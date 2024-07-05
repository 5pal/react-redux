import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";
import { legacy_createStore as createStore } from "redux";

const addToDo = createAction("ADD", function prepare(text) {
    return {
        payload: {
            text,
            id: nanoid(), // 랜덤문자
        },
    };
});
const deleteToDo = createAction("DELETE");
console.log(addToDo("hello"));

// const reducer = (state = [], action) => {
//     switch (action.type) {
//         case addToDo.type:
//             return [
//                 ...state,
//                 {
//                     text: action.payload,
//                     id: action.id,
//                 },
//             ];
//         case deleteToDo.type:
//             return state.filter(toDo => toDo.id !== action.id);

//         default:
//             return state;
//     }
// };

const reducer = createReducer([], builder => {
    builder
        .addCase(addToDo, (state, action) => {
            state.push({ id: action.payload.id, text: action.payload.text });
        })
        .addCase(deleteToDo, (state, action) => {
            return state.filter(toDo => toDo.id !== action.payload);
        });
});

const store = createStore(reducer);

export const actionCreator = {
    addToDo,
    deleteToDo,
};

export default store;
