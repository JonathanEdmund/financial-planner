import ItemCard from "./ItemCard";

function ItemList(props) {
  const items = props.data;
  const group = items.reduce((groupedItems, item) => {
    const date = item.date;

    if (groupedItems[date] == null) groupedItems[date] = [];

    groupedItems[date].push(item);

    return groupedItems;
  }, {});

  return (
    <div className="my-3 ">
      {Object.entries(group).map((item, index) => {
        return <ItemCard key={index} date={item[0]} list={item[1]} />;
      })}
    </div>
  );
}

export default ItemList;
