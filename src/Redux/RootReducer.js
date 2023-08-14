const initialState = { 
    Costumers:[] , 
    Products:[],
    Purchases:[],
}

const rootReducer = (state=initialState,action) => { 

    switch(action.type)
    {
        //first load from firebase every time we run the app 
        case 'LOAD':
            {
       
               return {...state,[action.payload.name]:action.payload.arr} 
            }

        default:return state;
    }

}

export default rootReducer