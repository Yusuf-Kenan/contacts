import React from "react";
import Header from "../components/header";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Cats() {
  const { categoriesState, bookState } = useSelector((state) => state);
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
                  const books = bookState.books.filter(
                    (book) => book.catId === cat.id
                  );
                  return (
                    <tr key={cat.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{cat.name}</td>
                      <td>{books.length}</td>
                      <td>
                        <div
                          className="btn-group"
                          role="group"
                        >
                          <button
                            onClick={() => {}}
                            type="button"
                            className="btn btn-danger btn-sm"
                          >
                            Del
                          </button>
                          <Link
                            to={``}
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
      </div>
    </div>
  );
}
