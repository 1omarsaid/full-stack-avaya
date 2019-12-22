// /client/App.js
import React, { Component } from 'react';
import axios from 'axios';
import * as data from "./actions/dataActions"
import { connect } from "react-redux"
import "./app.css"


class App extends Component {
  // initialize our state
  state = {
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
  };

  

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our first get method that uses our backend api to
  // fetch data from our data base
  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
    // data.fetchData();
  };

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = (message) => {
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }
    //This part will be in the actions, we will simply 
    //add idToBeAdded and message as a parameter
    axios.post('http://localhost:3001/api/putData', {
      id: idToBeAdded,
      message: message,
    });

  };

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = (idTodelete) => {
    parseInt(idTodelete);
    let objIdToDelete = null;
    this.state.data.forEach((dat) => {
      if (dat.id == idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    //This part will be in the actions, we will simply 
    //add objIdToDelete as a parameter
    axios.delete('http://localhost:3001/api/deleteData', {
      data: {
        id: objIdToDelete,
      },
    });
  };

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    parseInt(idToUpdate);
    this.state.data.forEach((dat) => {
      if (dat.id == idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    //This part will be in the actions, we will simply 
    //add objIdToUpdate and updateToApply as a parameter

  
    axios.post('http://localhost:3001/api/updateData', {
      id: objIdToUpdate,
      update: { message: updateToApply },
    });
  };


  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { data } = this.state;
    return (
      <div>
        <div className="webrtc">

        </div>

        <div className="bottom">
          <div className="inputContainer">
            <div className="inputContainerTop"> 
              <div className="add">
                <input
                  type="text"
                  onChange={(e) => this.setState({ message: e.target.value })}
                  placeholder=" add something in the database"
                  style={{ width: '200px' }}
                />
                <button onClick={() => this.putDataToDB(this.state.message)}>
                  ADD
                </button>
              </div>
              <div className="delete">
                <input
                  type="text"
                  style={{ width: '200px' }}
                  onChange={(e) => this.setState({ idToDelete: e.target.value })}
                  placeholder=" put id of item to delete here"
                />
                <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
                  DELETE
                </button>
            </div>
            </div>
            <div className="inputContainerBottom">
              <div className="update">
              <input
                type="text"
                style={{ width: '200px' }}
                onChange={(e) => this.setState({ idToUpdate: e.target.value })}
                placeholder=" id of item to update here"
              />
              <input
                type="text"
                style={{ width: '200px' }}
                onChange={(e) => this.setState({ updateToApply: e.target.value })}
                placeholder=" put new value of the item here"
              />
              <button
                onClick={() =>
                  this.updateDB(this.state.idToUpdate, this.state.updateToApply)
                }
              >
                UPDATE
              </button>
            </div>
            </div>
          </div>

          <div className="messageContainer">
            {data.length <= 0
              ? 'NO DB ENTRIES YET'
              : data.map((dat) => (
                  <h3 className="message" key={data.message}>
                    <span style={{ color: 'red' }}> id: </span> {dat.id} <br />
                    <span style={{ color: 'red', paddingLeft: 10 }}> data: </span>
                    {dat.message}
                  </h3>
                ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state){
  return {
    data: state.data,
    
  }
}

export default App;
// export default connect(mapStateToProps)(App);