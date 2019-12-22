export default function reducer(
    state={
    data: [],
    id: 0,
    message: null,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
}, action) {


    switch(action.type){
        case "FETCH_DATA":{
            return {
                ...state,
                data: [...state.data, action.payload],
            }
        }
        
    }
    return state
}