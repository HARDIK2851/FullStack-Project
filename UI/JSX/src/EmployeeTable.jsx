import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route,Routes, Link } from 'react-router-dom';
import { graphqlRequest } from '../App';
export default class EmployeeTable extends React.Component {
    constructor(props) {
      super(props);
      this.handleDelete = this.handleDelete.bind(this);
      this.handleEdit = this.handleEdit.bind(this);
    }

    // this will the click on edit button
    handleEdit(employee) {
        this.props.toggleEdit(employee);
    }
  
    // this will hanlde the click on delete button
    // first it will fetch the graphql query
    // then it will check if employees's current status is active or not, if it is active, it will not allow user to delete that data
    handleDelete(id,currentStatus) {
      const mutation = `
          mutation {
              deleteData(id: "${id}")
          }
      `;
      if(currentStatus != 1){
      graphqlRequest(mutation)
          .then((data) => {
              if (data.deleteData) {
                  // Refresh data or perform any other actions after successful deletion
                  const updatedEmployeeInfo = this.props.EmployeeInfo.filter(employee => employee._id !== id);
                  // Update the state with the filtered data
                  this.props.updateEmployeeInfo(updatedEmployeeInfo);
                  alert("Employee Data Deleted successfully");
              } else {
                console.log("deletion failed");
              }
          })
          .catch((error) => {
              console.error('Error deleting data:', error);
          });
        }
        else{
          alert("CAN'T DELETE EMPLOYEE – STATUS ACTIVE");
        }
  }
  
    render() {
      const { EmployeeInfo } = this.props;
      if (EmployeeInfo.length === 0) {
        return <h1>There is no data to Display, Please enter Employee data</h1>;
      } else {
        return (
        <div>
          <h2>Employee Table</h2>
          <div className="table-responsive">
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr class="table-primary">
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
                <th>Date of Joining</th>
                <th>Title</th>
                <th>Department</th>
                <th>Employee Type</th>
                <th>Current Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {EmployeeInfo.map((employee) => {
                return (
                  <tr class="table-success" key={employee._id}>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.age}</td>
                    <td>{employee.dateOfJoining}</td>
                    <td>{employee.title}</td>
                    <td>{employee.department}</td>
                    <td>{employee.employeeType}</td>
                    <td>{employee.currentStatus}</td>
                    <td>
                      <Link to={`/update`}><button className="btn btn-primary" onClick={() => { this.handleEdit(employee);}}>Edit</button>  </Link>          
                      <button className="btn btn-danger mr-2" onClick={() => this.handleDelete(employee._id, employee.currentStatus)}>Delete</button>
                      </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </div>
        );
      }
    }
  }