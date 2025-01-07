import { CategoriesAPI } from "@/services/categoriesAPI";
import { ProductsAPI } from "@/services/productsAPI";
import { OrdersAPI } from "@/services/ordersAPI";
import { UsersAPI } from "@/services/usersAPI";

export class Resume {
    static Types = [
        {
            id: 0,
            label: "Productos",
            color: "#c9463c",
            queryKey: "countProducts",
            queryFunction: ProductsAPI.countAll,
        },
        {
            id: 1,
            label: "Ordenes",
            color: "#6b3cc9",
            queryKey: "countOrders",
            queryFunction: OrdersAPI.countAll,
        },
        {
            id: 2,
            label: "Categorias",
            color: "#3cc941",
            queryKey: "countCategories",
            queryFunction: CategoriesAPI.countAll,
        },
        {
            id: 3,
            label: "Usuarios",
            color: "#4a3cc9",
            queryKey: "countUsers",
            queryFunction: UsersAPI.countAll,
        },
    ];
}

export class Status {
    static Types = [
        {
            id: 0,
            label: "Ninguno",
            colors: "bg-white",
        },
        {
            id: 1,
            label: "Pendiente",
            colors: "bg-blue-200 text-blue-800",
        },
        {
            id: 2,
            label: "Aceptado",
            colors: "bg-green-200 text-green-800",
        },
        {
            id: 3,
            label: "Rechazado",
            colors: "bg-red-200 text-red-800",
        },
        {
            id: 4,
            label: "Cancelado",
            colors: "bg-red-200 text-red-800",
        },
        {
            id: 5,
            label: "Entregado",
            colors: "bg-yellow-200 text-yellow-800",
        },
    ];

    static Pending = 1;
    static Accepted = 2;
    static Rejected = 3;
    static Cancelled = 4;
    static Delivered = 5;
}

export class Edit {
    static Types = {
        accept: 1,
        cancel: 2,
        edit: 3,
        deliver: 4,
    };
}
