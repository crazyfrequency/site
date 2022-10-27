async function main(){
    let theme = Number(localStorage.getItem("theme")),
    darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)").matches;
    console.log(theme)
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
}
window.onload=()=>main().catch(()=>null)

async function embed_preview(){
    
    let prev1 = document.getElementsByClassName("embed-preview")[0],
    prev2 = document.getElementsByClassName("embed-preview1")[0];
    if(prev1.classList.contains("active")){
        prev1.classList.remove("active");
        prev2.classList.remove("active");
    }else{
        prev1.classList.add("active");
        prev2.classList.add("active");
    }
}

function menu(element){
    for(let e of document.getElementsByClassName("list-group-item")){
        e.classList.remove("active");
    }
    element.classList.add("active");
}

