var allpages = [];
var images_elements=[],
url_for_image_count=1,
channels={
    vk:{

    },discord:{
        
    }
};
async function main(){
    let theme = Number(localStorage.getItem("theme")),
    darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if(theme==1){
        document.body.classList.replace("dark-theme","light-theme");
        document.getElementsByClassName("theme-moon")[0].classList.remove("active");
    }else if(theme==2){
        document.body.classList.replace("light-theme","dark-theme");
        document.getElementsByClassName("theme-sun")[0].classList.remove("active");
    }else{
        localStorage.setItem("theme",`${darkThemeMq+1}`);
        if(!darkThemeMq){
            document.body.classList.replace("dark-theme","light-theme");
            document.getElementsByClassName("theme-moon")[0].classList.remove("active");
        }else{
            document.body.classList.replace("light-theme","dark-theme");
            document.getElementsByClassName("theme-sun")[0].classList.remove("active");
        }
    }
    for(let e of document.getElementsByClassName("list-group-item"))
        allpages.push(e.dataset.target);
    let path = window.location.pathname.replace(/\/main(\/|)/,"").replace("/","");
    if(allpages.includes(path)){
        for(let e of document.getElementsByClassName("list-group-item")){
            e.classList.remove("active");
        }
        for(let e of document.getElementsByClassName("main-page-inner")){
            e.classList.remove("active");
        }
        document.getElementById("b-"+path).classList.add("active");
        document.getElementById(path).classList.add("active");
    }else{
        history.replaceState(null,null,"/main/send");
    }
    let res = await fetch("/api/login/check").catch(()=>null);
    if(res.ok){
        document.getElementById("login").classList.add("invisible");
        setTimeout(async()=>{
            document.getElementById("login").classList.remove("active");
        },1000)
    }
    
}
window.onload=()=>main().catch(()=>null)
window.onpopstate=()=>{
    let path = window.location.pathname.replace(/\/main(\/|)/,"").replace("/","");
    for(let e of document.getElementsByClassName("list-group-item")){
        e.classList.remove("active");
    }
    for(let e of document.getElementsByClassName("main-page-inner")){
        e.classList.remove("active");
    }
    document.getElementById("b-"+path).classList.add("active");
    document.getElementById(path).classList.add("active");
}
async function embed_preview(){
    
    let prev1 = document.getElementsByClassName("embed-preview")[0];
    if(prev1.classList.contains("active")) 
        prev1.classList.remove("active")
    else prev1.classList.add("active");
    
}
async function button_click(element){
    if(element.classList.contains("active")) 
        element.classList.remove("active")
    else element.classList.add("active");
}
async function login(element){
    element.classList.add("active");
    let res = await fetch("/api/login",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
        login:login_text.value,
        password:password_text.value,
    })}).catch(()=>null);
    document.getElementById("login").classList.add("invisible");
    setTimeout(async()=>{
        element.classList.remove("active");
        document.getElementById("login").classList.remove("active");
    },1000)
    
}

function menu(element,event){
    if(event.ctrlKey) return window.open("./"+element.dataset.target, '_blank')
    for(let e of document.getElementsByClassName("list-group-item")){
        e.classList.remove("active");
    }
    for(let e of document.getElementsByClassName("main-page-inner")){
        e.classList.remove("active");
    }
    element.classList.add("active");
    document.getElementById(element.dataset.target).classList.add("active");
    history.pushState(null,null,"./"+element.dataset.target)
}

function select_theme(element){
    let theme_button1 = document.getElementsByClassName("theme-moon")[0].classList,
    theme_button2 = document.getElementsByClassName("theme-sun")[0].classList;
    if(element.classList.contains("theme-moon")){
        theme_button1.add("active");
        theme_button2.remove("active");
        document.body.classList.replace("light-theme","dark-theme");
        localStorage.setItem("theme",`${2}`);
    }else{
        theme_button2.add("active");
        theme_button1.remove("active");
        document.body.classList.replace("dark-theme","light-theme");
        localStorage.setItem("theme",`${1}`);
    }
}

async function logout(){
    fetch("/api/logout",{
        method:"POST",
    }).catch(()=>null);
    document.getElementById("login").classList.add("active");
    setTimeout(()=>{
        document.getElementById("login").classList.remove("invisible");
    },10)
    
}

function vk_discord_colapse(){
    let el = document.getElementsByClassName("input-group vk-dis1")[0];
    if(checkbox_send_vk.checked)
        el.children[1].classList.add("active")
    else el.children[1].classList.remove("active");
    if(checkbox_send_discord.checked) 
        el.children[0].classList.add("active")
    else el.children[0].classList.remove("active");
}
