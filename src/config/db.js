const mongoose=require("mongoose")

const mondbUrl="mongodb+srv://nidhigoda99:eAI2zdzOvhpCeBCl@cluster0.5gtt5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDb=()=>{
    return mongoose.connect(mondbUrl);
}


module.exports={connectDb}