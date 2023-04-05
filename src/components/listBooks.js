import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/actions/actionTypes";
import ConfirmComp from "./confirm_comp";

export default function ListBooks() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const dispatch = useDispatch();
  const { bookState, categoriesState } = useSelector((state) => state);

  const deleteBook = (id) => {
    dispatch({ type: actionTypes.bookActions.DELETE_BOOK_START });
    api
      .delete(`${urls.books}/${id}`)
      .then((res) => {
        dispatch({
          type: actionTypes.bookActions.DELETE_BOOK_SUCCESS,
          payload: id,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.bookActions.DELETE_BOOK_FAIL,
          payload: "Server error",
        });
      });
  };

  return (
    <>
    <div className="d-flex justify-content-end"><Link className="p-3" to={"/add"}>Add Book</Link></div>
      <table className="table table-striped my-5">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">Auther</th>
            <th scope="col">Cats</th>
            <th scope="col">Operrations</th>
          </tr>
        </thead>
        <tbody>
          {bookState.books.map((book, index) => {
            // let myCat = null;
            // for(let i=0;i<categoriesState.categories.length;i++){
            //     if(categoriesState.categories[i].id===book.catId){
            //         myCat=categoriesState.categories[i]
            //     }
            // }
            const theCat = categoriesState.categories.find(
              (item) => item.id === book.catId
            );

            return (
              <tr key={book.id}>
                <th scope="row">{index + 1}</th>
                <td>{book.name}</td>
                <td>{book.auther}</td>
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
                        setDeleteId(book.id);
                      }}
                      type="button"
                      className="btn btn-danger btn-sm"
                    >
                      Del
                    </button>
                    <button type="button" className="btn btn-warning btn-sm">
                      Edit
                    </button>
                    <Link to={`book-detail/${book.id}`} type="button" className="btn btn-info btn-sm">
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
            deleteBook(deleteId);
            setShowConfirm(false);
          }}
        />
      )}
    </>
  );
}
