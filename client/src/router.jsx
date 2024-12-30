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
import EditUserView from "@/views/admin/user/EditUserView";

import MainView from "@/views/store/MainView";
import SearchView from "@/views/store/SearchView";
import ContactView from "@/views/store/ContactView";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<StoreLayout />}>
                    <Route index element={<MainView />} />

                    <Route path="search" element={<SearchView />} />
                    <Route path="contact" element={<ContactView />} />
                </Route>

                <Route path="auth" element={<AuthLayout />} />

                <Route path="admin" element={<AdminLayout />}>
                    <Route index element={<DashboardView />} />
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
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
