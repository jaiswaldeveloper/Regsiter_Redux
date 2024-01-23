
const initalstate = {
    user :[],
    error : null
}

const userReducers = (state = initalstate, action )=>{
    console.log('Reducer Action:', action);

    switch (action.type) {
        case "SIGN_UP_SUCCESS":
            console.log("Reducer Action Payload:", action.payload);  // Add this line

            return{
                ...state,
                user: [...state.user, action.payload],
                error: null
            }
            
        
        case "SIGN_UP_FAILURE":
            return{
                ...state,
                error: action.payload

            }
        
        case "LOGOUT_SUCCESS":
            return {
                user: [],
                error: null,
              };
        
        case "LOGOUT_FAILURE":
            return{
                ...state,
                error: action.payload

            }

            
    
        default:
            return state;
    }
}



export default userReducers