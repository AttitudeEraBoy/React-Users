import React, { Component } from 'react'
import UserConsumer from '../context';
import axios from 'axios';


class UpdateUser extends Component {
    state = {
      name: "",
      department: "",
      salary: "",
      error: false
    }
    
    changeInput = (e) => {
      this.setState({
        [e.target.name] : e.target.value
      });
    }

    componentDidMount = async () => {
      const {id} = this.props.match.params;

      const response = await axios.get(`http://localhost:3004/users/${id}`);
      
      const {name,salary,department} = response.data;

      this.setState({
        name,
        salary,
        department
      });
    }

    validateForm = () => {
      const {name,salary,department} = this.state;
      if(name === "" || salary === "" || department === ""){
          return false;
      }
      return true;
    }

    UpdateUser = async (dispatch,e) => {
      e.preventDefault();
      
      //Update User
      const {id} = this.props.match.params;
      const {name,salary,department} = this.state;
      const UpdatedUser = {
        name,
        salary,
        department
      };

      if(!this.validateForm()){
        this.setState({
          error: true
        });
        return;
      }
      
      const response = await axios.put(`http://localhost:3004/users/${id}`,UpdatedUser);
      
      dispatch({type: "UPDATE_USER",payload : response.data});
      //Redirect
      this.props.history.push("/");
    }
  render() {
    const {name,salary,department} = this.state;
    
    return <UserConsumer>
    {
      value => {
        const {dispatch} = value;
        return (
          <div className = "col-md-8 mb-4">
            
         
          
          <div className="card">
             <div className="card-header">
             <h4>Update User Form</h4>
             </div>
             <div className="card-body">
             <form onSubmit = {this.UpdateUser.bind(this,dispatch)}>
             <div className="from-group">
             <label htmlFor="name">Name</label>
             <input 
             type="text"
             name="name"
             id="id"
             placeholder= "Enter Name"
             className= "form-control" 
             value = {name}
             onChange = {this.changeInput}
             />
             </div>
             <div className="from-group">
             <label htmlFor="department">Department</label>
             <input 
             type="text"
             name="department"
             id="department"
             placeholder= "Enter Department"
             className= "form-control" 
             value = {department}
             onChange = {this.changeInput}
             />
             </div>
             <div className="from-group">
             <label htmlFor="salary">Salary</label>
             <input 
             type="text"
             name="salary"
             id="salary"
             placeholder= "Enter Salary"
             className= "form-control" 
             value = {salary}
             onChange = {this.changeInput}
             />
    
    <button className="btn btn-danger btn-block" type="submit">Update User</button>
             </div>
             
             </form>
             
             </div>
             </div>
              
          </div>
        )
      }
    }
    </UserConsumer>
    
  }
}
export default UpdateUser;