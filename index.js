const app=require("./src/app");
const main=require("./src/config/db");
main();
app.listen(3000,()=>{
    console.log("server is running on port 3000");
})