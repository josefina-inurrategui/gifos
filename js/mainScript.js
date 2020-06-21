document.getElementById("btn-night").addEventListener("click", ()=>{
    if(document.getElementById("body").className == "body"){
        document.getElementById("body").classList.toggle("dark");
        document.getElementById("logo").setAttribute("src", "images/gifOF_logo_dark.png");
        document.getElementById("glass").setAttribute("src", "images/Combined Shape.svg");
        document.getElementById("drop").setAttribute("src","images/forward.svg");
        }
    });
document.getElementById("btn-day").addEventListener("click", ()=>{
    if(document.getElementById("body").className !== "body"){
        document.getElementById("body").classList.toggle("dark");
        document.getElementById("logo").setAttribute("src", "images/gifOF_logo.png")
        document.getElementById("glass").setAttribute("src", "images/lupa_inactive.svg")
        document.getElementById("drop").setAttribute("src","images/dropdown.svg")    
    }
}); 

const searchInput = document.getElementById("search__button")
const result = document.getElementById("search_result");
const token = "WWgW3UIDG6hoX2VO5lpRgcTEf0DRmaQF";
const searchParam = document.getElementById("q").value;
const input = document.getElementById("q")
const hashtag = new Set();
document.getElementById("misGifos").addEventListener("click", getMyGifos);


function hashtagBtn(){
    const lastSearching = document.createElement("button");
    const searching = document.getElementById("searching");
    const text = document.createElement ("p");
    lastSearching.className = "hashtag";
    searching.appendChild(lastSearching);
    lastSearching.appendChild(text);
    for (const item of hashtag){
        text.innerHTML = `# ${item}`;
        var q = item;
    };
    lastSearching.addEventListener("click", async()=>{       
            const divResult = document.getElementById("space_result");
            divResult.innerHTML=""; 
            console.log();
            const url = "https://api.giphy.com/v1/gifs/search?q="+ q +"&api_key="+token+"&limit=20";
            const resp = await fetch (url);
            const datos = await resp.json();
            console.log(datos);
            const title = document.getElementById("result_title");
            title.innerHTML = q;
            datos.data.forEach(gif => {                
                const div = document.createElement("div");
                const img = document.createElement("img");        
                result.className = "sections"; 
                img.src = gif.images.fixed_height.url;
                divResult.appendChild(div);
                div.appendChild(img);
                return datos; 
            }); 
        }
    )    
}
const searched = []
async function findGif(e){
    e.preventDefault();
    document.getElementById("suggestSearch").className = "hidden";
    document.getElementById("space_result").innerHTML=""; 
    const searchParam = document.getElementById("q").value   
    const url = "https://api.giphy.com/v1/gifs/search?q="+searchParam+"&api_key="+token+"&limit=20";
    const resp = await fetch (url);
    const datos = await resp.json();
    console.log(datos);
    const title = document.getElementById("result_title");
    result.className = "sections"; 
    title.innerHTML = searchParam;
    hashtag.add(searchParam);
    searched.push(searchParam);
    localStorage.setItem("busquedas", JSON.stringify(searched))  
    hashtagBtn()
    datos.data.forEach(gif => {
        const divResult = document.getElementById("space_result");
        const div = document.createElement("div");
        const img = document.createElement("img");  
        img.src = gif.images.fixed_height.url;
        divResult.appendChild(div);
        div.appendChild(img);

    }); 
    return datos; 
}
searchInput.addEventListener("click",findGif);

input.addEventListener("keyup",suggestSearch);

const optionOne = document.getElementById("suggestSearch__option1")
const optionTwo = document.getElementById("suggestSearch__option2")
const optionThree = document.getElementById("suggestSearch__option3")
function suggestSearch(){
    const searchingParams = document.getElementById("q").value;
    document.getElementById("suggestSearch").className = "suggestSearch";
    optionOne.innerHTML = `${searchingParams} funny`;
    optionTwo.innerHTML = `${searchingParams} cute`;
    optionThree.innerHTML = `${searchingParams} angry`; 
    if (searchingParams == "") {
        document.getElementById("suggestSearch").className = "hidden";}
}
optionOne.addEventListener("click",()=>{
    document.getElementById("suggestSearch").className = "hidden";
    let q = optionOne.innerHTML;
    searchOptions(q)
})
optionTwo.addEventListener("click",()=>{
    document.getElementById("suggestSearch").className = "hidden";
    let q = optionTwo.innerHTML;
    searchOptions(q)
})
optionThree.addEventListener("click",()=>{
    document.getElementById("suggestSearch").className = "hidden";
    let q = optionThree.innerHTML;
    searchOptions(q)
})

async function searchOptions(input){       
    document.getElementById("space_result").innerHTML=""; 
    const url = "https://api.giphy.com/v1/gifs/search?q="+input+"&api_key="+token+"&limit=20";
    const resp = await fetch (url);
    const datos = await resp.json();
    console.log(datos);
    const title = document.getElementById("result_title");
    result.className = "sections"; 
    title.innerHTML = input;
    hashtag.add(input);
    searched.push(input);
    localStorage.setItem("busquedas", JSON.stringify(searched))  
    hashtagBtn()
    datos.data.forEach(gif => {
        const divResult = document.getElementById("space_result");
        const div = document.createElement("div");
        const img = document.createElement("img");  
        img.src = gif.images.fixed_height.url;
        divResult.appendChild(div);
        div.appendChild(img);

    }); 
    return datos; 
}
    
async function todayGifs(){
    const url = "https://api.giphy.com/v1/gifs/search?q=coding"+"&api_key="+token+"&limit=4";
    const resp = await fetch (url);
    const datos= await resp.json();
    const title = datos.data.title
    console.log(datos);
    datos.data.forEach(gif => {
        const space = document.getElementById("space_suggestions");
        const eachGif = document.createElement("div");
        const img = document.createElement("img");
        const titleHashtag = document.createElement("div");
        const verMas = document.createElement("button");
        const title = gif.title;
        eachGif.className = "gif";
        titleHashtag.className = "titlehashtag";
        verMas.className = "vermas"
        img.src = gif.images.fixed_height.url;
        titleHashtag.innerHTML=`# ${title}`;
        verMas.innerHTML= "Ver Mas";
        space.appendChild(eachGif);
        eachGif.appendChild(img);
        eachGif.appendChild(titleHashtag);
        eachGif.appendChild(verMas);
        verMas.addEventListener("click", async(e)=>{
            e.preventDefault();
            space.innerHTML ="";
            const url = "https://api.giphy.com/v1/gifs/search?q=coding"+"&api_key="+token+"&limit=10";
            const resp = await fetch (url);
            const datos = await resp.json();
            console.log(datos);
            datos.data.forEach(gif => {
                const divResult = document.getElementById("space_suggestions");
                const div = document.createElement("div");
                const img = document.createElement("img");  
                img.src = gif.images.fixed_height.url;
                divResult.appendChild(div);
                div.appendChild(img);
            })
        })
    });
    return datos;  
}
todayGifs(); 

async function trendingGifs(){
    const url = "https://api.giphy.com/v1/gifs/trending?"+"api_key="+token+"&limit=10";
    const resp = await fetch (url);
    const datos = await resp.json();
    console.log(datos);
    datos.data.forEach(gif => {
        const space = document.getElementById("space_trend");
        const div = document.createElement("div");
        const img = document.createElement("img");
        img.src = gif.images.fixed_height.url;
        div.className = "trendgif";
        const downHover = document.createElement("div");
        downHover.className = "downhover";
        downHover.innerHTML = `# ${gif.title}`
        space.appendChild(div);
        div.appendChild(img);
        div.appendChild(downHover)

    });
    return datos;  
} 
trendingGifs();
async function getMyGifos(){
    const gifs = localStorage.getItem('arrayMyGifs');
    const myGifResult = document.getElementById("space_result");
    result.className = "sections";
    myGifResult.innerHTML= "";
    const url = `https://api.giphy.com/v1/gifs?apiKey=${token}&ids=${gifs}`;
    const resp = await fetch (url);
    const datos= await resp.json();
    console.log(datos);
    datos.data.forEach(gif => {
        const eachGif = document.createElement("div");
        const img = document.createElement("img");
        img.src = gif.images.fixed_height.url;
        myGifResult.appendChild(eachGif);
        eachGif.appendChild(img);
        });
    };
