import actionTypes from "../actions/actionTypes";

const initialState = {
  pending: false,
  success: false,
  categories: [],
  fail: false,
  error: "",
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.categoryActions.GET_CAT_START:
      return {
        ...state,
        pending: true,
      };

    case actionTypes.categoryActions.GET_CAT_SUCCESS:
      return {
        ...state,
        pending: false,
        success: true,
        categories: action.payload,
      };

    case actionTypes.categoryActions.GET_CAT_FAIL:
      return {
        ...state,
        pending: false,
        success: false,
        fail: true,
        error: action.payload,
      };

      case actionTypes.categoryActions.ADD_CAT:
        return{
          ...state,
          categories:[...state.categories, action.payload],
        }

    default:
      return state;
  }
};

export default categoryReducer;
