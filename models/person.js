const mongoose =require('mongoose')
const bcrypt =require('bcrypt');


const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    created_at:{
        type:Date
        // required:true,
    },
    updated_at:{
        type:Date
        // required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

personSchema.pre('save', async function (next){

    const person= this;
    if(!person.isModified('password') ) return next();
    // if(!person.isModified('password')) return next();
 
        try{
            const salt =await bcrypt.genSalt(10)
            const hashedPassword= await bcrypt.hash(person.password, salt);
            person.password= hashedPassword;
            person.updated_at=new Date();
            person.created_at=new Date();
            next()

        }catch(err){
            return next(err)

        }
    
} )


personSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();

    if (update.password) {
        try {
            const salt = await bcrypt.genSalt(10);
            update.password = await bcrypt.hash(update.password, salt);
            this.setUpdate(update);
            update.updated_at=new Date()
            next();
        } catch (error) {
            return next(error);
        }
    } else {
        next();
    }
});

personSchema.methods.comparePassword= async function(candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err)
    {
        throw err;
    }
}



                                          // name of the table
const Person =mongoose.model('Person',personSchema,'user')
module.exports=Person;