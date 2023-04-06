import React, { useState } from "react";
import Header from "../components/header";
import ConfirmComp from "../components/confirm_comp";
import actionTypes from "../redux/actions/actionTypes";
import urls from "../api/urls";
import api from "../api/api";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Cats() {
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const { categoriesState, personState } = useSelector((state) => state);

  const deleteCat = (id) => {
    dispatch({ type: actionTypes.personActions.DELETE_PERSON_START });
    api
      .delete(`${urls.categories}/${id}`)
      .then((res) => {
        dispatch({
          type: actionTypes.categoryActions.DELETE_CAT_SUCCESS,
          payload: id,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.categoryActions.DELETE_CAT_FAIL,
          payload: "Server error",
        });
      });
  };

  return (
    <div>
      <Header />
      <div className="container my-3 d-flex justify-content-end">
        <Link to={"/add-cat"} type="button" className="btn btn-primary btn-sm">
          Add
        </Link>
      </div>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Options</th>
            </tr>
          </thead>
          <tbody>
            {categoriesState.categories.length === 0 && (
              <tr>
                <td colSpan={4}>There is Any Cats</td>
              </tr>
            )}
            {categoriesState.categories.length > 0 && (
              <>
                {categoriesState.categories.map((cat, index) => {
                  const persons = personState.persons.filter(
                    (person) => person.catId === cat.id
                  );
                  return (
                    <tr key={cat.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{cat.name}</td>
                      <td>{persons.length}</td>
                      <td>
                        <div className="btn-group" role="group">
                          <button
                            onClick={() => {
                              setShowConfirm(true);
                              setDeleteId(cat.id);
                            }}
                            type="button"
                            className="btn btn-danger btn-sm"
                          >
                            Del
                          </button>
                          <Link
                            to={`/cat-edit/${cat.id}`}
                            type="button"
                            className="btn btn-warning btn-sm"
                          >
                            Edit
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
        {showConfirm === true && (
          <ConfirmComp
            title="Delete"
            message="Are you sure !!!"
            onCancel={() => setShowConfirm(false)}
            onConfirm={() => {
              deleteCat(deleteId);
              setShowConfirm(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
