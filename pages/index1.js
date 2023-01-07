import WebBundlr from '@bundlr-network/client';
import {providers} from "ethers";
import fileReaderStream from "filereader-stream";
import {floor,random} from 'mathjs'


export default function Home() {
  async function bruh(){
    await fetch('/api/mon',{method:'POST'})
  }
  async function upload(){
    const provider = new providers.Web3Provider(window.ethereum);
    await provider._ready()
    let sum=0;
    const bundlr = new WebBundlr("https://node1.bundlr.network", "matic", provider);
    await bundlr.ready();
    const thumbnail=document.getElementById("thumbnail").files[0];
    const file=document.getElementById("file").files[0];
    const desc=document.getElementById("descrip").value;
    const tit=document.getElementById("title").value;
    const p1=await (await bundlr.getPrice(thumbnail.size)).toNumber();
    const p2=await (await bundlr.getPrice(file.size)).toNumber();
    const phone=document.getElementById("phone").value;
    sum=(p2+p1)
    await bundlr.fund(sum);
    const tx2=await bundlr.upload(fileReaderStream(thumbnail),{tags: [{name:"Content-Type",value: thumbnail.type}]})
    const tx3=await bundlr.upload(fileReaderStream(file),{tags: [{name:"Content-Type",value: file.type}]})
    document.getElementById("uploadedAt").innerHTML=tx3.id;
    const msg="Your file has been uploaded to arweave.net/"+tx3.id;
    await fetch('/api/twilioMsg',{method:'POST',headers:{'Content-Type': 'application/json'},body: JSON.stringify({ phone: phone, message: msg })})
    var currentdate = new Date(); 
    var datetime = "Last Sync: " + currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
    await fetch('/api/mon',{method:'POST',headers:{"Content-Type":"application/json"},body:JSON.stringify({"desc":desc,"thumbnail":tx2.id,"file":tx3.id,"date":datetime,"uuuid":floor(random() * 10000000000),"owner":provider.provider.selectedAddress.toString(),"title":tit})})
  }
  async function chPrice(){
    await bruh();
    await window.ethereum.enable()
    const provider = new providers.Web3Provider(window.ethereum);
    await provider._ready()
    let sum=0;
    const bundlr = new WebBundlr("https://node1.bundlr.network", "matic", provider);
    await bundlr.ready();
    const thumbnail=document.getElementById("thumbnail").files[0];
    const file=document.getElementById("file").files[0];
    const p1=await (await bundlr.getPrice(thumbnail.size)).toNumber();
    const p2=await (await bundlr.getPrice(file.size)).toNumber();
    sum+=(p1+p2);
    document.getElementById("price").innerHTML=sum +" ATOM";
  }
  return (
    <>
    <link href='https://css.gg/search.css' rel='stylesheet'></link>
        <div class="topBar">
            <text id="tit">Analos</text>
            <button id="sellHere"><b>Sell Here</b></button>
            <button id="community"><b>Community</b></button>
        </div>
        <div class="bot">
            <div id="botHead">
            <center>
            <p id="heading">
                Upload a File Here!!
            </p>
            </center>
            </div>
            <div id="botBot">
              <div id="1P">
                <center>
                <h2>Upload a Thumbnail</h2>
                <input type="file" id="thumbnail"></input>
                </center>
              </div>
              <div id="2P">
                <center>
                <h2>Write a Description</h2>
                <input id="title"></input>
                <br></br><br></br>
                <textarea id="descrip"></textarea>
                </center>
              </div>
              <div id="3P">
                <center>
                <h2>Upload the File</h2>
                <input type="file" id="file"></input>
                <br></br><br></br>
                <input type="text" id="phone" placeholder='Enter your phone number'></input>
                <br></br>
                <br></br>
                <h3 id="price"></h3>
                <button id="checkPrice" onClick={chPrice}>Check Price</button>
                <br></br>
                <button id="upload" onClick={upload}>Upload</button>
                <h3 id="uploadedAt"></h3>
                </center>
              </div>
            </div>
        </div>
    </>
  )
}
