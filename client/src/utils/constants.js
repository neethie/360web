export class EditType {
    static Accept = {
        type: 1,
    };
    static Reject = {
        type: 2,
    };
    static Edit = {
        type: 3,
    };
}
export class Status {
    static Pending = {
        type: 1,
        label: "Pendiente",
        color: "bg-blue-200 text-blue-800",
    };
    static Accepted = {
        type: 2,
        label: "Aceptado",
        color: "bg-green-200 text-green-800",
    };
    static Rejected = {
        type: 3,
        label: "Rechazado",
        color: "bg-red-200 text-red-800",
    };
}
export class ResumeType {
    static Type = new Map([
        [1, { type: 1, label: "Productos", color: "#c9463c" }],
        [2, { type: 2, label: "Órdenes", color: "#6b3cc9" }],
        [3, { type: 3, label: "Categorias", color: "#3cc941" }],
        [4, { type: 4, label: "Usuarios", color: "#4a3cc9" }],
    ]);

    static getColorByType(type) {
        return this.Type.get(type)?.color || "#ccc"; // Color predeterminado
    }

    static getLabel(type) {
        return this.Type.get(type)?.label || "Unknown";
    }

    static getAllTypes() {
        return Array.from(this.Type.values());
    }
}

export class ProductCard {
    static Type;
}
