export const checkPermissions = (req, res, permissions) => {
    if (req.user.rol_id < permissions) {
        throw new Error("No se tienen permisos");
    }
};
