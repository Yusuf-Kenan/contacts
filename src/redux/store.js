import { createStore, combineReducers } from "redux";
import booksReducer from "./reducers/booksReducer";
import categoryReducer from "./reducers/categoriesReducer";


const rootReducer=combineReducers({
    bookState:booksReducer,
    categoriesState:categoryReducer
})

const store=createStore(rootReducer)

export default store