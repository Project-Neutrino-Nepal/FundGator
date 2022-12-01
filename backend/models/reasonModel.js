// create model for reason
const {model,Schema} = require('mongoose');
const ReasonSchema = new Schema({

    company:{
        type:Schema.Types.ObjectId,
        ref:'company'},

    reason0:{
        type:String,
        required:false
    },
    reason1:{
        type:String,
        required:false
    },
    reason2:{
        type:String,
        required:false
    },
    reason3:{
        type:String,
        required:false
    },
    reason4:{
        type:String,
        required:false
    },
    reason5:{

        type:String,
        required:false
    },
    reason6:{
        type:String,
        required:false
    },
    reason7:{

        type:String,
        required:false
    },
    reason8:{
        type:String,
        required:false
    }
    
    
});
module.exports = model('reason',ReasonSchema);