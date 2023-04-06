import React, { useState } from "react";
import Header from "../components/header";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import urls from "../api/urls";
import api from "../api/api";
import actionTypes from "../redux/actions/actionTypes";

export default function AddPerson() {
  const navi = useNavigate();
  const dispatch = useDispatch();
  const { categoriesState } = useSelector((state) => state);

  const [form, setForm] = useState({
    id: String(new Date().getTime()),
    name: "",
    phone: "",
    email: "",
    birthplace: "",
    birthyear: "",
    catId: categoriesState.categories[0].id,
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(form);
    //validation
    if (form.name === "" || form.author === "" || form.catId === "") {
      alert("Please insert all fields");
      return;
    }
    if (form.name.length < 2) {
      alert("person name must be more the 2 letters");
      return;
    }

    //post api req and dispatch

    api
      .post(urls.persons, form)
      .then((res) => {
        dispatch({
          type: actionTypes.personActions.ADD_PERSON,
          payload: form,
        });
        navi("/");
      })
      .catch((err) => {});
  };

  return (
    <div>
      <Header />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Ana"
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              phone
            </label>
            <input
              type="text"
              className="form-control"
              id="phone"
              placeholder="0555"
              value={form.phone}
              onChange={(event) =>
                setForm({ ...form, phone: event.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              email
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="example@example.com"
              value={form.email}
              onChange={(event) =>
                setForm({ ...form, email: event.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="birthplace" className="form-label">
              Birth Place
            </label>
            <input
              type="text"
              className="form-control"
              id="birthplace"
              placeholder="Turkey"
              value={form.birthplace}
              onChange={(event) =>
                setForm({ ...form, birthplace: event.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="birthyear" className="form-label">
              Birth Year
            </label>
            <input
              type="number"
              className="form-control"
              id="birthyear"
              placeholder="1991"
              value={form.birthyear}
              onChange={(event) =>
                setForm({ ...form, birthyear: Number(event.target.value) })
              }
            />
          </div>

          <div className="input-group">
            <label className="input-group-text">Categoris</label>
            <select
              //defaultValue={categoriesState.categories[0].id}
              className="form-select"
              value={form.catId}
              onChange={(event) =>
                setForm({ ...form, catId: event.target.value })
              }
            >
              {categoriesState.categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="my-4 d-flex justify-content-center">
            <button type="submit" className="btn btn-success">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
