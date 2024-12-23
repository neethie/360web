import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateJWT = (data) => {
    const token = jwt.sign(
        {
            data,
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        process.env.JWT_KEY
    );
    return token;
};
