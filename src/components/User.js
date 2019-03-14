import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Users from './Users';
import UserConsumer from "../context";
import Popup from 'reactjs-popup';
import posed from 'react-pose';
import axios from 'axios';
import {Link} from 'react-router-dom';


const Animation = posed.div({
  visible : {
    opacity : 1,
    applyAtStart : {
      display : "block"
    },
    transition : {duration: 700}
},
hidden : {
    opacity : 0,
    applyAtEnd : {
      display : "none"
    },
    transition : {duration: 700}
}
});

class User extends Component {
 
 static defaultProps = {
    id: "",
    name : "Bilgi yok",
    salary: "Bilgi yok",
    department : "Bilgi yok"
 }
 
 onClickEvent = (e) =>{
   this.setState({
     isVisible : !this.state.isVisible  
   });
}

onDeleteUser = async (dispatch,e) => {
   const {id} = this.props;
   
await axios.delete(`http://localhost:3004/users/${id}`);
   //Consumer Dispatch
dispatch({
  type : "DELETE_USER",payload:id
});  
  
  }

  componentWillUnmount = () => {
    console.log("Component Will Unmount");
  }

  openModal  () {
    this.setState({ open: true })
  }

  closeModal () {
    this.setState({ open: false })
  }
 
 constructor(props){
   super(props);
   this.state = {
     isVisible : false,
     open : false
   }
   this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
 }
  render() {
    const {id,name,department,salary} = this.props;
   const {isVisible} = this.state;
   return (<UserConsumer>
    {
      value => {
        const {dispatch} = value;
        return (
          <div className= "col-md-8 mb-4">
         <div className="card" style={isVisible ? {backgroundColor : "#62848d",color: "white", cursor: "pointer"} : null}>
         <div className="card-header d-flex justify-content-between">
         <h4 className="d-inline" onClick={this.onClickEvent.bind()}>{name}</h4>   
         <Animation>
         <i onClick={this.openModal} className="far fa-trash-alt" style= {{cursor: "pointer"}}></i> 
         <Popup position="right bottom" open={this.state.open} onClose={this.closeModal} closeOnDocumentClick>
         <div className="text-center">
         <a className="close" onClick={this.closeModal} style={{cursor:"pointer"}}>
              &times;
            </a>
         <h5 style={{color:"black",fontSize:"25px"}}>Are you sure about deleting this concept?</h5>
         <button className="btn btn-dark" onClick={this.onDeleteUser.bind(this,dispatch)}>Delete</button>
         </div>
         </Popup> 
         </Animation>
    </div> 
    {
      isVisible ? <div className="card-body">
    <p className="card-text">Maaş : {salary}</p>
    <p className="card-text">Department : {department}</p>
    <Link to = {`edit/${id}`} className="btn btn-dark btn-block">Update User</Link>
    </div> : null
    }
    </div>
          </div>
        )
      }
    }
    </UserConsumer>)
  }
}

User.propTypes={
name: PropTypes.string.isRequired,
salary: PropTypes.string.isRequired,
department : PropTypes.string.isRequired,
id : PropTypes.string.isRequired
}
 
export default User;