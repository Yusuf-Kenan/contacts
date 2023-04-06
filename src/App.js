import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";



import HomePage from "./pages/home_page";
import Error from "./pages/Error";
import api from "./api/api";
import urls from "./api/urls";
import actionTypes from "./redux/actions/actionTypes";
import PersonDetail from "./pages/PersonDetail";
import AddPerson from "./pages/AddPerson";
import PersonEdit from "./pages/PersonEdit";
import Cats from "./pages/Cats";
import AddCat from "./pages/AddCat";
import CatEdit from "./pages/CatEdit";

function App() {

  const {personState, categoriesState}=useSelector(state=>state)
  const dispatch = useDispatch();


  useEffect(() => {
    //persons
    dispatch({ type: actionTypes.personActions.GET_PERSON_START });
    api
      .get(urls.persons)
      .then((res) => {
        dispatch({
          type: actionTypes.personActions.GET_PERSON_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.personActions.GET_PERSON_FAIL,
          payload: "An error accured while fetching",
        });
      });
    //cats
    dispatch({type:actionTypes.categoryActions.GET_CAT_START});
    api.get(urls.categories)
    .then((res)=>{
      dispatch({type:actionTypes.categoryActions.GET_CAT_SUCCESS,payload:res.data});
    })
    .catch((err)=>{
      dispatch({type:actionTypes.categoryActions.GET_CAT_FAIL,payload:"An error accured while fetching"})
    })
  }, []);


if(personState===false || categoriesState.success === false)return null;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/person-detail/:personId" element={<PersonDetail/>}/>
        <Route path="/person-edit/:personId" element={<PersonEdit/>}/>
        <Route path="/add" element={<AddPerson/>} />
        <Route path="/cats" element={<Cats/>} />
        <Route path="/cat-edit/:catId" element={<CatEdit/>}/>
        <Route path="/add-cat" element={<AddCat/>} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
