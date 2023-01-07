import clientPromise from "../../lib/mongodb";
export default async function(req,res){
    const client=await clientPromise;
    const db=client.db("files");
    const query = { $text: { $search: req.body["title"].toString() } };
    
    const cursor =await db.collection("file1").find(query).toArray();
    res.json(cursor)
}