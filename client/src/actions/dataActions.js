// import axios from "axios";

//This will replace getDataFromDb
export function fetchData() {
    return function(dispatch){
        fetch('http://localhost:3001/api/getData')
          .then((data) => data.json())
          .then((response) => {
              dispatch({type: "FETCH_DATA", payload: response.data})
          })
    }    
}


//This will replace putDataToDB
export function putDataToDB() {
    return {
        type: "PUT_DATA_DB",
        payload: {

        }
    }
}

//This will replace deleteFromDB
export function deleteFromDB() {
    return {
        type: "DELETE_FROM_DB",
        payload: {

        }
    }
}

//This will replace updateDB
export function updateDB() {
    return{
        type: "UPDATE_DB",
        payload:{

        }
    }
}
