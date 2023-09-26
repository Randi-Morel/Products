import IdCell from "../../../orders/order-list/components/IdCell";
import DefaultCell from "../../../orders/order-list/components/DefaultCell";
import StatusCell from "../../../orders/order-list/components/StatusCell";
import CustomerCell from "../../../orders/order-list/components/CustomerCell";


const column = [
  { Header: "id", accessor: "id", Cell: ({ value }) => <IdCell id={value} /> },
  {
    Header: "date",
    accessor: "date",
    Cell: ({ value }) => <DefaultCell value={value} />,
  },
  {
    Header: "status",
    accessor: "status",
    Cell: ({ value }) => {
      let status;

      if (value === "paid") {
        status = <StatusCell icon="done" color="success" status="Paid" />;
      } else if (value === "refunded") {
        status = <StatusCell icon="replay" color="dark" status="Refunded" />;
      } else {
        status = <StatusCell icon="close" color="error" status="Canceled" />;
      }

      return status;
    },
  },
  {
    Header: "customer",
    accessor: "customer",
    Cell: ({ value: [name, data] }) => (
      <CustomerCell image={data.image} color={data.color || "dark"} name={name} />
    ),
  },
  {
    Header: "product",
    accessor: "product",
    Cell: ({ value }) => {
      const [name, data] = value;

      return (
        <DefaultCell
          value={typeof value === "string" ? value : name}
          suffix={data.suffix || false}
        />
      );
    },
  },
  { Header: "revenue", accessor: "revenue", Cell: ({ value }) => <DefaultCell value={value} /> },
]
export default column