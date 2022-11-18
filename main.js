const { VK } = require("vk-io");
const express = require("express");
const app = express();
const bp = require("body-parser");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const fileUpload = require('express-fileupload');
const {Pool} = require("pg");
const path = require("path");
const { vk_token, dc_token, channel_id, vk_name, vk_image_url, file, site} = require('./config.json');
const vk = new VK({token: vk_token});
const {Client, GatewayIntentBits, Message, EmbedBuilder,ActionRowBuilder,ButtonBuilder} = require('discord.js');
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
    
    response.cookie("key","123",{
        maxAge:1600000000,
        httpOnly:true,
        path:"/api"
    });
    response.sendStatus(200);
})
app.post("/api/logout",async(request, response)=>{
    response.clearCookie("key");
    response.sendStatus(200);
})
app.get("*",async(request, response)=>{
    response.redirect("/main")
})

app.listen(80,()=>{console.log(`Сервер запущен\nПорт:${80}`)}).on("error",async(e)=>{
    console.error(e.name,"\n",e.message,"\n",e.stack)
});
