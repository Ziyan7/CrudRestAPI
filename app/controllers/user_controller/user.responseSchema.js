/**
 * different status code for different task
 */
module.exports = {
    userApiSuccess: {
        status:200,
        message:""
    },
    userApiFailure:{
        status:500,
        message:""
    },
    userApiFindFailure:{
        status:500,
        message:"Couldn't find User with given id"
    },
    userValidationFailure:{
        status:400,
        message:""
    }
}