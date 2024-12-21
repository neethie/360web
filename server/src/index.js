import colors from "colors";

import server from "./server.js";

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log("—————————————————————————————————————");
    console.log(
        colors.cyan.bold(`Servidor iniciado en http://localhost:${port}`)
    );
});
