export const corsConfig = {
    origin: function (origin, callback) {
        const whitelist = [process.env.CLIENT_URL];

        // Durante desarrollo, origin puede ser undefined para peticiones locales
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("No permitido por CORS"));
        }
    },
    credentials: true, // Habilita el envío de cookies y credenciales
};
