import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../UserContext";
import ItemForm from "./components/ItemForm";

function EditItem() {
  const context = useContext(UserContext);
  const { id } = useParams();
  const [item, setItem] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/items/${id}`)
      .then((response) => {
        setItem(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  function handleForm(form) {
    axios
      .patch(`/api/items/${id}`, form)
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  function handleDelete() {
    axios
      .delete(`/api/items/${id}`)
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  function changeItemDate(item) {
    //jelek tp hrs fokus backend
    // changes item.date to YYYY-MM-dd format
    const date = new Date(item.date).toLocaleDateString("en-CA");
    item.date = date;
    return item;
  }

  if (!context.user?.username) {
    return <p>Please Login to access this page</p>;
  }
  return (
    <div className="w-75 mt-3 mx-auto">
      <h1>Edit Item</h1>
      {item ? (
        <>
          <ItemForm
            type="Update"
            defaultValue={changeItemDate(item)}
            handleForm={handleForm}
          />
          <Button onClick={handleDelete} variant="danger">
            Delete
          </Button>
        </>
      ) : (
        <p>loading items...</p>
      )}
    </div>
  );
}

export default EditItem;
