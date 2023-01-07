import Image from 'next/image'
import {providers} from "ethers";
function Home(data1) {
    var dFinal
    var fromAddress
    var toAddress
    var uuid
    function switchPage(){
        location.replace("/index1")
    }
    async function bruh(id){
        await window.ethereum.enable()
        const provider = new providers.Web3Provider(window.ethereum)
        await provider._ready()
        fromAddress=provider.provider.selectedAddress.toString()
        const tx=await fetch('/api/search',{"method":"POST","headers":{"Content-Type":"application/json"},"body":JSON.stringify({"uuuid":id})})
        toAddress=await tx.json()
        toAddress=toAddress[0]["owner"]
        uuid=id
        
    }
    async function find(id){
        bruh(id)
    }
    async function search(){
        let val=document.getElementById("SearchBar").value;
        let data=await fetch("/api/search",{"method":"POST","headers":{"Content-Type":"application/json"},"body":JSON.stringify({"title":val})})
        console.log(await data.json())
    }
    async function fetchData(){
        const data=await fetch("/api/mon1")
        const data1=await data.json()
        dFinal=data1
        if(document.getElementById("explore").innerHTML==""){
            for(let i=0;i<data1.length;i++){
                let d=document.createElement("div");
                d.setAttribute("class","card")
                let dd=document.createElement("div")
                document.getElementById("explore").appendChild(d);
                let c=document.createElement("center")
                let h=document.createElement("h3")
                let im=document.createElement("img")
                let hh=document.createElement("p")
                let b=document.createElement("button")
                b.innerHTML="Buy Now"
                b.setAttribute("class","buyNow")
                b.setAttribute("id",data1[i]["uuuid"])
                b.onclick=function(){find(data1[i]["uuuid"])}
                let b1=document.createElement("button")
                b1.innerHTML="Buy Now"
                b1.setAttribute("class","buyNow")
                b1.setAttribute("id",data1[i]["uuuid"])
                b1.onclick=function(){find(data1[i]["uuuid"])}
                hh.innerHTML=data1[i]["date"]
                im.setAttribute("src","https:/arweave.net/"+data1[i]["thumbnail"])
                im.setAttribute("class","imgInCard")
                im.setAttribute("title",data1[i]["desc"])
                h.innerHTML=data1[i]["title"]
                c.appendChild(h)
                c.appendChild(im)
                c.appendChild(document.createElement("br"))
                c.appendChild(hh)
                c.appendChild(b1)
                dd.appendChild(c)
                let ddd=document.createElement("div")
                let pp=document.createElement("p")
                pp.innerHTML=data1[i]["desc"]
                ddd.append(pp)
                ddd.append(b)
                dd.setAttribute("class","card-front")
                ddd.setAttribute("class","card-back")
                d.appendChild(dd)
                d.appendChild(ddd)
            }
        }
    }
    fetchData()
    return (
        <>
        <link href='https://css.gg/search.css' rel='stylesheet'></link>
        <div class="topBar">
            <text id="tit">Analos</text>
            <button id="sellHere" onClick={switchPage}><b>Sell Here</b></button>
            <button id="community"><b>Community</b></button>
        </div>
        <div class="bot">
            <div id="botHead">
            <center>
            <p id="heading">
                Files being currently served
            </p>
            </center>
            </div>
            <div id="botBot">
                <div id="Search">
                <input type="text" id="SearchBar" placeholder='Search Here'></input>
                <button id="searchBotin" onClick={search}><i class="gg-search"></i></button>
                </div>
            </div>
            <div id="CardsArea">
                <div class="explore" id="explore">
                </div>
                <div class="explore">
                </div>
            </div>
        </div>
        </>
      )
}
export default Home