import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/actions/actionTypes";
import ConfirmComp from "./confirm_comp";

export default function Listpersons() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const { personState, categoriesState } = useSelector((state) => state);
  const [filteredPerson, setFilteredPerson] = useState(personState.persons);

  useEffect(() => {
    const temp = personState.persons.filter(
      (person) =>
        person.name.toLowerCase().includes(searchText.toLowerCase()) ||
        person.phone.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredPerson(temp);
  }, [searchText]);

  const deletePerson = (id) => {
    dispatch({ type: actionTypes.personActions.DELETE_PERSON_START });
    api
      .delete(`${urls.persons}/${id}`)
      .then((res) => {
        dispatch({
          type: actionTypes.personActions.DELETE_PERSON_SUCCESS,
          payload: id,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.personActions.DELETE_PERSON_FAIL,
          payload: "Server error",
        });
      });
  };

  return (
    <div className="container my-5">
      <div className=" d-flex justify-content-between">
        <input
          className="form-control-sm"
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        <Link className="p-3" to={"/add"}>
          Add
        </Link>
      </div>
      <table className="table table-striped my-5">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">phone</th>
            <th scope="col">Cats</th>
            <th scope="col">Operrations</th>
          </tr>
        </thead>
        <tbody>
          {filteredPerson.map((person, index) => {
            const theCat = categoriesState.categories.find(
              (item) => item.id === person.catId
            );

            return (
              <tr key={person.id}>
                <th scope="row">{index + 1}</th>
                <td>{person.name}</td>
                <td>{person.phone}</td>
                <td>{theCat.name}</td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      onClick={() => {
                        setShowConfirm(true);
                        setDeleteId(person.id);
                      }}
                      type="button"
                      className="btn btn-danger btn-sm"
                    >
                      Del
                    </button>
                    <Link
                      to={`person-edit/${person.id}`}
                      type="button"
                      className="btn btn-warning btn-sm"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`person-detail/${person.id}`}
                      type="button"
                      className="btn btn-info btn-sm"
                    >
                      Dtls
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showConfirm === true && (
        <ConfirmComp
          title="Delete"
          message="Are you sure !!!"
          onCancel={() => setShowConfirm(false)}
          onConfirm={() => {
            deletePerson(deleteId);
            setShowConfirm(false);
          }}
        />
      )}
    </div>
  );
}
