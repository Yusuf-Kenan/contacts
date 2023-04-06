import React, { useState } from "react";
import Header from "../components/header";

import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/actions/actionTypes";

export default function CatEdit() {
  const navi = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { categoriesState } = useSelector((state) => state);
  const myCat = categoriesState.categories.find(
    (cat) => cat.id === params.catId
  );
 
  const [form, setForm] = useState(myCat);

  const handleSubmit = (event) => {
    event.preventDefault();

    //validation
    if (form.name === "") {
      alert("Can not be empty");
      return;
    }

    api
      .put(`${urls.categories}/${params.catId}`, form)
      .then((res) => {
        dispatch({
          type: actionTypes.categoryActions.EDIT_CAT,
          payload: form,
        });
        navi("/cats");
      })
      .catch((err) => {});
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
