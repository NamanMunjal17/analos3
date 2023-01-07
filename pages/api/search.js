import clientPromise from "../../lib/mongodb";
export default async function(req,res){
    const client=await clientPromise;
    const db=client.db("files");
    const collection=db.collection("file1")
    let a=collection.find({uuuid:req.body["uuuid"]}).toArray()
    res.json(await a)
}