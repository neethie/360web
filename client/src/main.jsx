import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/admin/Home";
import Users from "./pages/admin/Users";
import Products from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";
import Categories from "./pages/admin/Categories";
import CreateProduct from "./pages/admin/components/panel/product/Create";

import StoreLayout from "./layouts/StoreLayout";
import Store from "./pages/store/Home";

import AuthLayout from "./layouts/AuthLayout";
import Auth from "./pages/auth/Home";
import Search from "./pages/store/Search";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Home />} />
                    <Route path="products">
                        <Route index element={<Products />} />
                        <Route path="create" element={<CreateProduct />} />
                    </Route>
                    <Route path="orders" element={<Orders />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="users" element={<Users />} />
                </Route>
                <Route path="/" element={<StoreLayout />}>
                    <Route index element={<Store />} />
                    <Route path="search" element={<Search />} />
                </Route>
                <Route path="/auth" element={<AuthLayout />}>
                    <Route index element={<Auth />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
