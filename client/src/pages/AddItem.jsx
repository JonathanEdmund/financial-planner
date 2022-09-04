import ItemForm from "./components/ItemForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../UserContext";

function AddItem() {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  function handleForm(form) {
    const editForm = {
      ...form,
      _userId: context.user._userId,
    };

    axios
      .post("/api/items/", editForm)
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="w-75 mt-3 mx-auto">
      <h1>Add Item</h1>
      <ItemForm type="Submit" handleForm={handleForm} />
    </div>
  );
}

export default AddItem;
