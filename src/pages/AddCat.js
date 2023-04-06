import React, { useState } from "react";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";
import { useSelector , useDispatch} from "react-redux";
import urls from "../api/urls";
import api from "../api/api";
import actionTypes from "../redux/actions/actionTypes";

export default function AddCat() {
    const navi=useNavigate()
    const dispatch=useDispatch()
    const {categoriesState}=useSelector(state=>state)
  const [form, setForm] = useState({
    id: String(new Date().getTime()),
    name: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    if (form.name === "") {
      alert("Name can not be empty");
      return;
    }

   const newCat=categoriesState.categories.find(cat=>cat.name.toLowerCase()===form.name.toLowerCase())
   if(newCat!==undefined){ alert("There is already one the same")}
   api.post(urls.categories,form)
   .then((res)=>{
    dispatch({type:actionTypes.categoryActions.ADD_CAT,payload:form})
    navi("/cats")
   })
   
   .catch((err)=>{})

  };

  return (
    <div>
      <Header />
      <div className="container my-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Category Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Novel"
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
            />
          </div>

          <div className="my-3 d-flex justify-content-center">
            <button type="submit" className="btn btn-success w-50">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
