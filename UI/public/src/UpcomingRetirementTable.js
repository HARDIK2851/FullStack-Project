import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

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
  handleDelete(id, currentStatus) {
    const mutation = `
          mutation {
              deleteData(id: "${id}")
          }
      `;
    if (currentStatus != 1) {
      graphqlRequest(mutation).then(data => {
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
      }).catch(error => {
        console.error('Error deleting data:', error);
      });
    } else {
      // this will show an alert when user trys to delete data of an active employee
      alert("CAN'T DELETE EMPLOYEE – STATUS ACTIVE");
    }
  }
  render() {
    // this will get data of all the employees
    const {
      EmployeeInfo
    } = this.props;

    // this will fillter out the data of employees whoes age is 64 or greater, so it can be displyed in Upcoming retirement table
    const retiringEmployees = EmployeeInfo.filter(employee => employee.age >= 64);
    if (retiringEmployees.length === 0) {
      return /*#__PURE__*/React.createElement("h1", null, "No upcoming retirement found.");
    } else {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Upcoming Retirement Table"), /*#__PURE__*/React.createElement("div", {
        className: "table-responsive"
      }, /*#__PURE__*/React.createElement("table", {
        className: "table table-striped"
      }, /*#__PURE__*/React.createElement("thead", {
        className: "thead-dark"
      }, /*#__PURE__*/React.createElement("tr", {
        class: "table-primary"
      }, /*#__PURE__*/React.createElement("th", null, "First Name"), /*#__PURE__*/React.createElement("th", null, "Last Name"), /*#__PURE__*/React.createElement("th", null, "Age"), /*#__PURE__*/React.createElement("th", null, "Date of Joining"), /*#__PURE__*/React.createElement("th", null, "Title"), /*#__PURE__*/React.createElement("th", null, "Department"), /*#__PURE__*/React.createElement("th", null, "Employee Type"), /*#__PURE__*/React.createElement("th", null, "Current Status"), /*#__PURE__*/React.createElement("th", null, "Action"))), /*#__PURE__*/React.createElement("tbody", null, retiringEmployees.map(employee => {
        return /*#__PURE__*/React.createElement("tr", {
          class: "table-success",
          key: employee._id
        }, /*#__PURE__*/React.createElement("td", null, employee.firstName), /*#__PURE__*/React.createElement("td", null, employee.lastName), /*#__PURE__*/React.createElement("td", null, employee.age), /*#__PURE__*/React.createElement("td", null, employee.dateOfJoining), /*#__PURE__*/React.createElement("td", null, employee.title), /*#__PURE__*/React.createElement("td", null, employee.department), /*#__PURE__*/React.createElement("td", null, employee.employeeType), /*#__PURE__*/React.createElement("td", null, employee.currentStatus), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Link, {
          to: `/update`
        }, /*#__PURE__*/React.createElement("button", {
          className: "btn btn-primary",
          onClick: () => {
            this.handleEdit(employee);
          }
        }, "Edit"), "  "), /*#__PURE__*/React.createElement("button", {
          className: "btn btn-danger mr-2",
          onClick: () => this.props.handleDelete(employee._id, employee.currentStatus)
        }, "Delete")));
      })))));
    }
  }
}