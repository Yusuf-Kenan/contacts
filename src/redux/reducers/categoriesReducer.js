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
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };

    case actionTypes.categoryActions.DELETE_CAT_START:
      return {
        ...state,
        pending: true,
      };

    case actionTypes.categoryActions.DELETE_CAT_SUCCESS:
      let filteredCat = state.categories.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        pending: false,
        success: true,
        fail: false,
        categories:filteredCat
      };

    case actionTypes.categoryActions.DELETE_CAT_FAIL:
      return {
        ...state,
        pending: false,
        success: false,
        fail: true,
        error: action.payload,
      };

      case actionTypes.categoryActions.EDIT_CAT:
        let temp=[];
        for(let i=0;i<state.categories.length;i++){

          if(state.categories[i].id!==action.payload.id){ console.log(state.categories[i])
            temp.push(state.categories[i]);
          }else {
            temp.push(action.payload);
          }
        }
        return{
          ...state,
          categories:temp,
        }

    default:
      return state;
  }
};

export default categoryReducer;
