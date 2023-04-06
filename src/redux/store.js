import { createStore, combineReducers } from "redux";
import personsReducer from "./reducers/personsReducer";
import categoryReducer from "./reducers/categoriesReducer";


const rootReducer=combineReducers({
    personState:personsReducer,
    categoriesState:categoryReducer
})

const store=createStore(rootReducer)

export default store