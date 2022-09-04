import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function ItemForm(props) {
  const date = new Date();
  const category = [
    "Electronics",
    "Entertainment",
    "Food",
    "Health",
    "Household",
    "Hygiene",
    "Outfit",
    "Sports",
    "Transport",
    "Vehicle",
    "Others",
  ];

  const [form, setForm] = useState(
    props.defaultValue || {
      name: "",
      category: "",
      price: "",
      date: date.toLocaleDateString("en-CA"),
      description: "",
    }
  );

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  return (
    <div className="w-50 ">
      <Form>
        <Form.Group>
          <Form.Control
            className="my-2"
            type="text"
            name="name"
            placeholder="Item name"
            value={form.name}
            onChange={handleChange}
          />
          <Form.Select
            className="my-2"
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option>Category</option>
            {category.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </Form.Select>
          <Form.Control
            className="my-2"
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
          />
          <Form.Control
            className="my-2"
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
          <Form.Control
            className="my-2"
            as="textarea"
            name="description"
            rows="3"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            props.handleForm(form);
          }}
        >
          {props.type}
        </Button>
      </Form>
    </div>
  );
}

export default ItemForm;
