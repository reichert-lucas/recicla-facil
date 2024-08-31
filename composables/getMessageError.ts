export const getMessageError = (error: any) => {
    if(error.response){
        if(error.response.data.message){    
            return error.response.data.message
        }
        
        if(error.response.data.errors){
            const errors = error.response.data.errors
            const firstErroIndex = Object.keys(errors)[0]
            const errorMsg = errors[firstErroIndex][0]

            return errorMsg
        }

        return 'Ocorreu um erro inesperado'
    }

    return 'Ocorreu um erro inesperado'
}