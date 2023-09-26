import Sales from "layouts/dashboards/sales";
import ShoppingCart from "layouts/dashboards/analytics";
import NewProduct from "./screens/products/new-product";
import EditProduct from "./screens/products/edit-product";
import ProductPage from "./screens/products/product-page";
import OrderList from "./screens/orders/order-list";
import OrderDetails from "./screens/orders/order-details";
import SignInBasic from "layouts/authentication/sign-in";
import MDAvatar from "components/MDAvatar";
import Icon from "@mui/material/Icon";
import { Inventory, ReceiptLong } from "@mui/icons-material";
import profilePicture from "assets/images/team-3.jpg";

const routes = [
  {
    type: "collapse",
    name: "Brooklyn Alice",
    key: "brooklyn-alice",
    icon: <MDAvatar src={profilePicture} alt="Brooklyn Alice" size="sm" />,
    collapse: [
      {
        name: "Logout",
        key: "logout",
        route: "/authentication/sign-in/basic",
        component: <SignInBasic />,
      },
    ],
  },
  { type: "divider", key: "divider-0" },
  {
    type: "collapse",
    name: "Dashboards",
    key: "dashboards",
    icon: <Icon fontSize="medium">dashboard</Icon>,
    component: <Sales />,
    noCollapse: true,
    route: "/dashboards",
  },
  {
    type: "collapse",
    name: "Shopping Cart",
    key: "shopping-cart",
    icon: <Icon fontSize="medium">shopping_cart</Icon>,
    component: <ShoppingCart />,
    noCollapse: true,
    route: "/shopping-cart",
  },
  {
    type: "collapse",
    name: "Products",
    key: "products",
    icon: <Inventory />,
    collapse: [
      {
        name: "New Product",
        key: "new-product",
        route: "/new-product",
        component: <NewProduct />,
      },
      {
        name: "Edit Product",
        key: "edit-product",
        route: "/edit-product",
        component: <EditProduct />,
      },
      {
        name: "Product Page",
        key: "product-page",
        route: "/product-page",
        component: <ProductPage />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Orders",
    key: "orders",
    icon: <ReceiptLong />,
    collapse: [
      {
        name: "Order List",
        key: "order-list",
        route: "/order-list",
        component: <OrderList />,
      },
      {
        name: "Order Details",
        key: "order-details",
        route: "/order-details",
        component: <OrderDetails />,
      },
    ],
  },
];

export default routes;
