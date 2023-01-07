import {ethers} from 'ethers'
import fs from 'fs'
export default async function handler(req, res) {
    const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/lCajdlXM9DkYsZbvHrPGhA-v2b9s2Y9g");
    const abi = fs.readFileSync("./analos.abi", "utf-8");
    const binary = fs.readFileSync("./dust.bin","utf8");
    const address="0xf65f236A49Eabb129B0F79E29C63c54F461972D1"
    const contract=new ethers.Contract( address , abi , provider)
    
}