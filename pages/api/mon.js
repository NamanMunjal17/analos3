import clientPromise from "../../lib/mongodb";
export default async function handler(req,res){
    const client=await clientPromise;
    const db=client.db("files");
    const data=req.body
    let ga=await db.collection("file1").insertOne(data);
    res.json({"fact":"JOE MAMA"})
}