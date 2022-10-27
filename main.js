const express = require("express");
const app = express();

app.use('/resource', express.static('./site/'));

app.get("/*",async(request, response)=>{
    console.log(request.path.slice(1))
    response.sendFile("C:/Users/diefi/Desktop/site/site/pages/main.html")
})

app.listen(80,()=>{console.log(`Сервер запущен\nПорт:${80}`)});
