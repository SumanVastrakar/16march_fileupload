const app= require("./index.js");
const connect  = require ("./configs/db.js")
app.listen (5000, async()=>{
    await connect();
    console.log("Listening on port 5000");
})