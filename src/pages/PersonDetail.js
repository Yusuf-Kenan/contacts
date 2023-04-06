import React, { useEffect, useState } from "react";
import Header from "../components/header";

import { useParams } from "react-router-dom";
import urls from "../api/urls";
import api from "../api/api";

//import { useSelector } from "react-redux";

export default function PersonDetail() {
  const [PersonDetail, setPersonDetail] = useState(null);
  const [catDetail, setCatDetail] = useState(null);

  //const { personState } = useSelector((state) => state);
  //console.log(personState);
  const params = useParams();
  console.log(params);

  //   const myPerson = personState.persons.find((item) => item.id === params.id);
  //   console.log(myPerson);  => BU YONTEMLE REDUXTAN VERI CEKILIR

  useEffect(() => {
    api
      .get(`${urls.persons}/${params.personId}`)
      .then((resPerson) => {
        setPersonDetail(resPerson.data);
        api
          .get(`${urls.categories}/${resPerson.data.catId}`)
          .then((resCat) => {
            setCatDetail(resCat.data);
          })
          .then((err) => {});
      })
      .catch((err) => {});
  }, []);
  if (PersonDetail === null || catDetail === null) {
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
              <h5 className="card-title">{PersonDetail.name}</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                {`Phone:  ${PersonDetail.phone}`}
              </h6>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                {`Category: ${catDetail.name}`}
              </h6>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                {`email: ${PersonDetail.email}`}
              </h6>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                {`Birthplace: ${PersonDetail.birthplace}`}
              </h6>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                {`Birt Year: ${PersonDetail.birthyear}`}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
