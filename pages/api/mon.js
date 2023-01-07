import clientPromise from "../../lib/mongodb";
export default async function handler(req,res){
    const client=await clientPromise;
    const db=client.db("files");
    const file=await db.collection("file1").find({}).toArray()
    res.json(file)
}