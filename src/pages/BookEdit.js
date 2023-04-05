import React,{useState} from 'react'
import Header from '../components/header'
import { useSelector, useDispatch } from 'react-redux';
import { useParams , useNavigate} from "react-router-dom";
import urls from "../api/urls";
import api from "../api/api";
import actionTypes from '../redux/actions/actionTypes';



export default function BookEdit() {
    const navi=useNavigate()
    const dispatch=useDispatch()
    const params = useParams();

    const{bookState, categoriesState}=useSelector(state=>state)
   
    const myBook=bookState.books.find(book=>book.id===params.bookId)
    console.log(myBook)

    const [form, setForm]=useState(myBook)

    const handleSubmit=(event)=>{
        event.preventDefault()
        //validation
    if (form.name === "" || form.author === "" || form.catId === "") {
        alert("Please insert all fields");
        return;
      }
      if (form.name.length < 2) {
        alert("Book name must be more the 2 letters");
        return;
      }


      api
      .put(`${urls.books}/${params.bookId}`, form)
      .then((res) => {
        dispatch({
          type: actionTypes.bookActions.EDIT_BOOK,
          payload: form,
        });
        navi("/")
      })
      .catch((err) => {});


    }

  return (
    <div>
      <Header/>
      
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Book Name
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
            <label htmlFor="auther" className="form-label">
              Auther
            </label>
            <input
              type="text"
              className="form-control"
              id="auther"
              placeholder="Gorki"
              value={form.auther}
              onChange={(event) =>
                setForm({ ...form, auther: event.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="publisher" className="form-label">
              Publiesher
            </label>
            <input
              type="text"
              className="form-control"
              id="publisher"
              placeholder="Can yayinlari"
              value={form.publisher}
              onChange={(event) =>
                setForm({ ...form, publisher: event.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="isbn" className="form-label">
              ISBN
            </label>
            <input
              type="text"
              className="form-control"
              id="isbn"
              placeholder="12121212987"
              value={form.isbn}
              onChange={(event) =>
                setForm({ ...form, isbn: event.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              placeholder="123"
              value={form.price}
              onChange={(event) =>
                setForm({ ...form, price: Number(event.target.value) })
              }
            />
          </div>

          <div className="input-group">
            <label className="input-group-text">Categoris</label>
            <select
            defaultValue={categoriesState.categories[0].id}
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
  )
}
