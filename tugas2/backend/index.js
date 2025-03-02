import express, {Router} from "express"
import cors from "cors"
import Route from "./route/route.js"

const app = express()
app.use(cors())
app.use(express.json())
app.use(Route)

app.listen(5000, ()=> {
    console.log("server is running");
});
