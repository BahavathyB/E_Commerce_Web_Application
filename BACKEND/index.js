
require("dotenv").config()
const express = require("express")
const cors = require("cors");
const mongoose = require("mongoose")
const router = require("./Routes/Routes")

const app = express()

app.use(express.json())

app.use(cors());
// app.use(body_parser.urlencoded({extended:true}))

// product route
app.use("/", router)




let port = process.env.PORT;


(async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB is connected successfully");
        
        app.listen(port, () => {
            console.log("Server is running in the port", port);
        })
    }
    catch(error){
        console.log("Error: ", error);
        process.exit(1)
    }
})();