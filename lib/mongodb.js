import {MongoClient} from "mongodb";

const uri="mongodb+srv://naman:awIadbvyFDg8A5sU@cluster0.kt4hmff.mongodb.net/?retryWrites=true&w=majority";
const client=new MongoClient(uri)
const clientPromise=client.connect()
export default clientPromise
