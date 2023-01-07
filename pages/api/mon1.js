import clientPromise from "../../lib/mongodb";
export default async function handler(req,res){
    const client=await clientPromise;
    const db=client.db("files");
    const response=await db.collection("file1").find({}).limit(10).toArray();
    res.json(response)
}