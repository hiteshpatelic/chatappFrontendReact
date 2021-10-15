import Joi from "joi";

const mobileNumberLengthErrorHandler = ()=>{
    return {
        error: "Mobile number must be 10 digits"
    }
}

export const addcontectInputValidation = (data)=>{

    const schema = Joi.object({
        username: Joi.string().required().min(3),
        moNumber: Joi.number().integer().min(1111111111).max(9999999999).required(),
    })
    const result = schema.validate(data)
    if(result.error && result.error.details[0].context.key === "moNumber"){
        return mobileNumberLengthErrorHandler()
    }else if(result.error){
        return {error: result.error.details[0].message }
    }else{
        return{ error: undefined}
    }
}