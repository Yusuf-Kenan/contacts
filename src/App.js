import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";



import HomePage from "./pages/home_page";
import Error from "./pages/Error";
import api from "./api/api";
import urls from "./api/urls";
import actionTypes from "./redux/actions/actionTypes";
import BookDetail from "./pages/BookDetail";
import AddBook from "./pages/AddBook";
import BookEdit from "./pages/BookEdit";
import Cats from "./pages/Cats";
import AddCat from "./pages/AddCat";
import CatEdit from "./pages/CatEdit";

function App() {

  const {bookState, categoriesState}=useSelector(state=>state)
  const dispatch = useDispatch();


  useEffect(() => {
    //books
    dispatch({ type: actionTypes.bookActions.GET_BOOKS_START });
    api
      .get(urls.books)
      .then((res) => {
        dispatch({
          type: actionTypes.bookActions.GET_BOOKS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.bookActions.GET_BOOKS_FAIL,
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


if(bookState===false || categoriesState.success === false)return null;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/book-detail/:bookId" element={<BookDetail/>}/>
        <Route path="/book-edit/:bookId" element={<BookEdit/>}/>
        <Route path="/add" element={<AddBook/>} />
        <Route path="/cats" element={<Cats/>} />
        <Route path="/cat-edit/:catId" element={<CatEdit/>}/>
        <Route path="/add-cat" element={<AddCat/>} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
