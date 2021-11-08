import { GET_ERRORS, CLEAR_ERRORS} from './types';

export const returnErrors = (msg, status, id = null) => {
    try {       	
        return {
            type: GET_ERRORS,
            payload:{
                msg,
                status,
                id
            }
        }
    } catch (error) {
        console.error(error);
    }    

}

export const clearErrors = () => {
    try {       	
        return {
            type: CLEAR_ERRORS            
        }
    } catch (error) {
        console.error(error);
    }    

}