import dotenv from "dotenv";
dotenv.config();

export const sqlConfig = {
    server: `${process.env.DB_SERVER}`,
    authentication: {
        type: "default",
        options: {
            userName: `${process.env.DB_USER}`,
            password: `${process.env.DB_PASSWORD}`,
        },
    },
    options: {
        database: `${process.env.DB_NAME}`,
        encrypt: true,
        trustServerCertificate: true,
    },
};
