import server from "./server";
import colors from "colors"

server.listen;

const port = process.env.PORT || 4000
server.listen(port, () => {
    console.log(colors.cyan.bold('Rest api en puerto 4000'))
})
