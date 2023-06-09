const actionTypes={
    personActions:{
        GET_PERSON_START:"GET_PERSON_START",
        GET_PERSON_SUCCESS:"GET_PERSON_SUCCESS",
        GET_PERSON_FAIL:"GET_PERSON_FAIL",
        //DELETE ACTIOS
        DELETE_PERSON_START:"DELETE_PERSON_START",
        DELETE_PERSON_SUCCESS:"DELETE_PERSON_SUCCESS",
        DELETE_PERSON_FAIL:"DELETE_PERSON_FAIL",
        //ADD ACTION
        ADD_PERSON:"ADD_PERSON",
        //EDIT ACTION
        EDIT_PERSON:"EDIT_PERSON"

    },
    categoryActions:{
        GET_CAT_START:"GET_CAT_START",
        GET_CAT_SUCCESS:"GET_CAT_SUCCESS",
        GET_CAT_FAIL:"GET_CAT_FAIL",
        //DELETE CAT
        DELETE_CAT_START:"DELETE_CAT_START",
        DELETE_CAT_SUCCESS:"DELETE_CAT_SUCCESS",
        DELETE_CAT_FAIL:"DELETE_CAT_FAIL",

        //ADD CAT
        ADD_CAT:"ADD_CAT",

        //EDIT CAT
        EDIT_CAT:"EDIT_CAT"
    }
}

export default actionTypes