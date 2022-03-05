import "../styles.css";
import React from "react";
import GridTable from "@nadavshaar/react-grid-table";
import { Link } from "react-router-dom";

// custom cell component
const OrderID = ({
  tableManager,
  value,
  field,
  data,
  column,
  colIndex,
  rowIndex
}) => {
  return (
    <div
      className="rgt-cell-inner"
      style={{ display: "flex", alignItems: "center", overflow: "hidden" }}
    >
      <Link to={ value} state={ {
          "id": "001",
          "customer": "Steve"
        }}
      >
        <span className="rgt-text-truncate" style={{ marginLeft: 10 }}>
          {value}
        </span>
      </Link>
    </div>
  );
};

let rows = [
  {
    "id": "001",
    "customer": "Steve"
  },
  {
    "id": "017",
    "customer": "Steve"
  },
  {
    "id": "021",
    "customer": "Steve"
  },
  {
    "id": "101",
    "customer": "Steve"
  }
];

const columns = [
  {
    id: 1,
    field: "id",
    label: "ID",
    cellRenderer: OrderID
  },
  {
    id: 2,
    field: "customer",
    label: "Customer"
  },
];

const OrderList = () => (
  <GridTable columns={columns} rows={rows} isPaginated={false} />
);

export default OrderList;
