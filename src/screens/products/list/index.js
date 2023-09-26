import { useState } from "react";
import Card from "@mui/material/Card";
import MDBox from "../../../components/MDBox";
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import DataTable from "../../../examples/Tables/DataTable";
import {column} from "./util";
import {firestore } from "../../../firebase";
function OrderList() {

  const [rows, setRows] = useState([]);

  React.useEffect(()=>{
    firestore().collection('products').orderBy('createdAt', 'desc').limit(250).get()
      .then(query=>{
        let list = []
        query.forEach(doc=>{
          let data = doc.data()
          data['id']  = doc.id
          list.push(data)
        })
        setRows(list)
      })
      .catch(err=>{

      })
  })


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox my={3}>
        <Card>
          <DataTable
            table={{
              columns:column,
              rows:rows
            }}
            entriesPerPage={false} canSearch />
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default OrderList;
