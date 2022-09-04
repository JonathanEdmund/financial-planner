import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function ItemPeriod(props) {
  const date = props.date;

  const [formPeriod, setFormPeriod] = useState(
    `${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(-2)}`
  );

  function shiftMonth(event) {
    const name = event.target.name;
    const month = date.getMonth();
    const newDate = new Date(date);
    if (name === "prev") {
      newDate.setMonth(month - 1);
    } else {
      newDate.setMonth(month + 1);
    }
    setFormPeriod(
      `${newDate.getFullYear()}-${`0${newDate.getMonth() + 1}`.slice(-2)}`
    );
    props.changePeriod(newDate);
  }

  function handleChange(event) {
    setFormPeriod(event.target.value);
  }

  function handleSubmit(event) {
    event.key === "Enter" && props.changePeriod(new Date(event.target.value));
  }

  return (
    <div className="w-75">
      <Button
        className="d-inline"
        variant="outline-primary"
        size="sm"
        onClick={shiftMonth}
        name="prev"
      >
        prev
      </Button>
      <Form.Control
        className="d-inline w-25 m-2"
        type="month"
        onChange={handleChange}
        onKeyPress={handleSubmit}
        value={formPeriod}
      />
      <Button
        className="d-inline"
        variant="outline-primary"
        size="sm"
        onClick={shiftMonth}
        name="next"
      >
        next
      </Button>
    </div>
  );
}

export default ItemPeriod;
