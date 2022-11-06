const express = require("express");
const app = express();
const bp = require("body-parser");
const cookieParser = require("cookie-parser");

var login = {"123":"123"},
cookie=["123"];

app.use('/resource', express.static('./site/'));
app.use(cookieParser());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.get("/main*",async(request, response)=>{
    response.sendFile("C:/Users/diefi/Desktop/site/site/pages/main.html")
})

app.get("/api/login/check",async(request, response)=>{
    console.log(request.cookies)
    if(request.cookies?.key=="123")
        response.sendStatus(200)
    else response.sendStatus(403);
})
app.post("/api/login",async(request, response)=>{
    console.log(request.body)
    
    response.cookie("key","123");
    response.sendStatus(200);
})
app.get("*",async(request, response)=>{
    response.redirect("/main")
})

app.listen(80,()=>{console.log(`Сервер запущен\nПорт:${80}`)}).on("error",async(e)=>{
    console.error(e.name,"\n",e.message,"\n",e.stack)
});
