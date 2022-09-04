import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import ItemList from "./components/ItemList";
import ItemPeriod from "./components/ItemPeriod";
import Button from "react-bootstrap/Button";

function Home() {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  const [items, setItems] = useState();
  const [period, setPeriod] = useState(new Date());

  useEffect(() => {
    axios
      .get(
        `/api/users/${
          context.user._userId
        }/items?year=${period.getFullYear()}&month=${period.getMonth() + 1}`
      )
      .then((response) => {
        const serverItems = response.data.items;
        setItems(serverItems);
      });
  }, [context.user._userId, period]);

  function changePeriod(period) {
    setPeriod(period);
  }

  if (!context.user?.username) {
    navigate("/Login");
    return <p>Please Login to access this page</p>;
  }

  return (
    <div className="w-75 mt-3 mx-auto">
      <h1>Hello {context.user.username}</h1>
      <Button as={Link} to="/items/new">
        Add item
      </Button>
      <ItemPeriod date={period} changePeriod={changePeriod} />
      {!items ? <p>Loading</p> : <ItemList data={items} />}
    </div>
  );
}

export default Home;
