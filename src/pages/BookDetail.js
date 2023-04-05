import React, { useEffect, useState } from "react";
import Header from "../components/header";

import { useParams } from "react-router-dom";
import urls from "../api/urls";
import api from "../api/api";

//import { useSelector } from "react-redux";

export default function BookDetail() {
  const [bookDetail, setBookDetail] = useState(null);
  const [catDetail, setCatDetail] = useState(null);

  //const { bookState } = useSelector((state) => state);
  //console.log(bookState);
  const params = useParams();
  console.log(params);

  //   const myBook = bookState.books.find((item) => item.id === params.id);
  //   console.log(myBook);  => BU YONTEMLE REDUXTAN VERI CEKILIR

  useEffect(() => {
    api
      .get(`${urls.books}/${params.bookId}`)
      .then((resBook) => {
        setBookDetail(resBook.data);
        api
          .get(`${urls.categories}/${resBook.data.catId}`)
          .then((resCat) => {
            setCatDetail(resCat.data);
          })
          .then((err) => {});
      })
      .catch((err) => {});
  }, []);
  if (bookDetail === null || catDetail === null) {
    return null;
  }

  return (
    <div>
      <Header />

      <div className=" card m-5">
        <div className="row g-0">
          <div className="col-4">
            <img
              src="https://picsum.photos/200/300"
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-8">
            <div className="card-body">
              <h5 className="card-title">{bookDetail.name}</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                Auther:
                {bookDetail.auther}
              </h6>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                Category: {catDetail.name}
              </h6>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                Publisher:
                {bookDetail.publisher}
              </h6>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                ISBN: {bookDetail.isbn}
              </h6>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                {bookDetail.price} &#8378;
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
