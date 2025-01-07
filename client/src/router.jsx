import { BrowserRouter, Route, Routes } from "react-router-dom";

import AuthLayout from "@/layouts/AuthLayout";
import StoreLayout from "@/layouts/StoreLayout";
import AdminLayout from "@/layouts/AdminLayout";

import DashboardView from "@/views/admin/DashboardView";

import CategoriesView from "@/views/admin/CategoriesView";
import EditCategoryView from "@/views/admin/category/EditCategoryView";
import CreateCategoryView from "@/views/admin/category/CreateCategoryView";

import OrdersView from "@/views/admin/OrdersView";
import EditOrderView from "@/views/admin/order/EditOrderView";

import ProductsView from "@/views/admin/ProductsView";
import EditProductView from "@/views/admin/product/EditProductView";
import CreateProductView from "@/views/admin/product/CreateProductView";

import UsersView from "@/views/admin/UsersView";
import CreateUserView from "@/views/admin/user/CreateUserView";
import EditUserView from "@/views/admin/user/EditUserView";

import ConfigView from "@/views/admin/ConfigView";

import MainView from "@/views/store/MainView";
import SearchView from "@/views/store/SearchView";
import ContactView from "@/views/store/ContactView";
import CartView from "@/views/store/CartView";
import AccountView from "@/views/store/AccountView";
import OrderView from "./views/store/OrderView";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Tienda */}
                <Route path="/" element={<StoreLayout />}>
                    <Route index element={<MainView />} />
                    <Route path="search" element={<SearchView />} />
                    <Route path="contact" element={<ContactView />} />
                    <Route path="cart" element={<CartView />} />
                    <Route path="order/:order_id" element={<OrderView />} />
                    <Route path="account" element={<AccountView />} />
                </Route>

                {/* Auth */}
                <Route path="auth" element={<AuthLayout />} />

                {/* Admin */}
                <Route path="admin" element={<AdminLayout />}>
                    <Route index element={<DashboardView />} />
                    <Route path="config" element={<ConfigView />} />
                    <Route path="categories">
                        <Route index element={<CategoriesView />} />
                        <Route path="create" element={<CreateCategoryView />} />
                        <Route
                            path="edit/:category_id"
                            element={<EditCategoryView />}
                        />
                    </Route>
                    <Route path="orders">
                        <Route index element={<OrdersView />} />
                        <Route
                            path="edit/:order_id"
                            element={<EditOrderView />}
                        />
                    </Route>
                    <Route path="products">
                        <Route index element={<ProductsView />} />
                        <Route
                            path="edit/:product_id"
                            element={<EditProductView />}
                        />
                        <Route path="create" element={<CreateProductView />} />
                    </Route>
                    <Route path="users">
                        <Route index element={<UsersView />} />
                        <Route
                            path="edit/:user_id"
                            element={<EditUserView />}
                        />
                        <Route path="create" element={<CreateUserView />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
