import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route,Routes, Link } from 'react-router-dom';

// this component will show the employees whoes retirment is comming soon
export default class UpcomingRetirementTable extends React.Component {
    constructor(props) {
      super(props);
      this.handleDelete = this.handleDelete.bind(this);
      this.handleEdit = this.handleEdit.bind(this);
    }

// this funtion will be handling the click on Edit button
    handleEdit(employee) {
        this.props.toggleEdit(employee);
    }
  
    // this funtion whill fetch the grapql query and delete the data of employee on which the user has clicked
    // it uses the id of employee to delete the correct employee data
    // also it chekc if the employee's current status is active , then it will not let user delete the data of that employee
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
                  // to update table after deletion
                  const updatedEmployeeInfo = this.props.EmployeeInfo.filter(employee => employee._id !== id);
                  // Update the state with the filtered data
                //   this will be used to update table data after deletion
                  this.props.updateEmployeeInfo(updatedEmployeeInfo);

                //   this will show an alert if employee data is deleted successfully
                  alert("Employee Data Deleted successfully");
              } else {
                  // Handle deletion failure
              }
          })
          .catch((error) => {
              console.error('Error deleting data:', error);
          });
        }
        else{
            // this will show an alert when user trys to delete data of an active employee
          alert("CAN'T DELETE EMPLOYEE – STATUS ACTIVE");
        }
  }
  
    render() {
        // this will get data of all the employees
        const { EmployeeInfo } = this.props;

        // this will fillter out the data of employees whoes age is 64 or greater, so it can be displyed in Upcoming retirement table
        const retiringEmployees = EmployeeInfo.filter(employee => employee.age >= 64);

        if (retiringEmployees.length === 0) {
            return <h1>No upcoming retirement found.</h1>;
        } else {
            return (
                <div>
                    <h2>Upcoming Retirement Table</h2>
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
                                {retiringEmployees.map((employee) => {
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
                                                {/* this buttons will allow user to delete and edit the data of employees */}
                                                <Link to={`/update`}><button className="btn btn-primary" onClick={() => { this.handleEdit(employee);}}>Edit</button>  </Link> 
                                                <button className="btn btn-danger mr-2" onClick={() => this.props.handleDelete(employee._id, employee.currentStatus)}>Delete</button>
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