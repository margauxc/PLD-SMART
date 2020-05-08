const { ErrorHandler } = require('./error')
module.exports = {
    excludeFields : (content, fields)=> {
        for( var i=0; i< fields.length; i++){
            if(fields[i] in content){
                delete content[fields[i]]
            }
        }
        return content
    },
    rejectFields : (content, fields)=> {
        for( var i=0; i< fields.length; i++){
            if(fields[i] in content){
                throw new ErrorHandler(400, fields[i] +" is an unauthorized field")
            }
        }
        return 
    },
    includeFields : (content, fields)=> {
        for( var i=0; i< fields.length; i++){
            if(!(fields[i] in content)){
                throw new ErrorHandler(400, fields[i] +" field should be in request")
            }
        }
        return 
    }
}