import clientPromise from "../../lib/mongodb";
export default async function(req,res){
    const client=await clientPromise;
    const db=client.db("files");
    const collection=db.collection("file1")
    let pipeline=[
        {
            $search: {
                index: "searchIndex",
                text:{
                    query: req.body["arg"],
                    path:{
                        'wildcard':'*'
                    }
                }
            }
        }
    ]
    let a=await collection.aggregate(pipeline)
    res.json(a)
}