import React from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";

function ItemCard(props) {
  const date = new Date(props.date).toDateString();
  const navigate = useNavigate();

  return (
    <div className="d-inline">
      <Card className="w-25 my-3">
        <Card.Header>{date}</Card.Header>
        <Card.Body>
          <Table hover responsive borderless>
            <tbody>
              {props.list.map((item, index) => {
                return (
                  <tr
                    key={index}
                    onClick={() => {
                      navigate(`/items/${item._id}`);
                    }}
                  >
                    <td className="text-muted">{item.category}</td>
                    <td>{item.name}</td>
                    <td className="text-danger">{item.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ItemCard;
