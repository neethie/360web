import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/admin/Home";
import Users from "./pages/admin/Users";
import Products from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";

import StoreLayout from "./layouts/StoreLayout";
import Store from "./pages/store/Home";
import Categories from "./pages/admin/Categories";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Home />} />
                    <Route path="products" element={<Products />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="users" element={<Users />} />
                </Route>
                <Route path="/" element={<StoreLayout />}>
                    <Route index element={<Store />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
