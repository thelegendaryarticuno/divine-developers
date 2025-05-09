import mongoose from "mongoose";

type ConnectionObject = {
    isConnected ?: number
}

const connection:ConnectionObject = {}

async function dbConnect():Promise<void>{
    if(connection.isConnected){
        console.log("Database is connected");
        return
    }
    try{
        const db= await mongoose.connect(process.env.MONGO_URI || '')
        connection.isConnected = db.connections[0].readyState
        console.log("DB IS CONNECTED");
    }catch(error){
        console.log("Database not connected",error)
        process.exit(1)
    }

}

export default dbConnect;