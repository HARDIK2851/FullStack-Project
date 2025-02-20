import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
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
  handleDelete(id, currentStatus) {
    const mutation = `
          mutation {
              deleteData(id: "${id}")
          }
      `;
    if (currentStatus != 1) {
      graphqlRequest(mutation).then(data => {
        if (data.deleteData) {
          // Refresh data or perform any other actions after successful deletion
          const updatedEmployeeInfo = this.props.EmployeeInfo.filter(employee => employee._id !== id);
          // Update the state with the filtered data
          this.props.updateEmployeeInfo(updatedEmployeeInfo);
          alert("Employee Data Deleted successfully");
        } else {
          console.log("deletion failed");
        }
      }).catch(error => {
        console.error('Error deleting data:', error);
      });
    } else {
      alert("CAN'T DELETE EMPLOYEE – STATUS ACTIVE");
    }
  }
  render() {
    const {
      EmployeeInfo
    } = this.props;
    if (EmployeeInfo.length === 0) {
      return /*#__PURE__*/React.createElement("h1", null, "There is no data to Display, Please enter Employee data");
    } else {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Employee Table"), /*#__PURE__*/React.createElement("div", {
        className: "table-responsive"
      }, /*#__PURE__*/React.createElement("table", {
        className: "table table-striped"
      }, /*#__PURE__*/React.createElement("thead", {
        className: "thead-dark"
      }, /*#__PURE__*/React.createElement("tr", {
        class: "table-primary"
      }, /*#__PURE__*/React.createElement("th", null, "First Name"), /*#__PURE__*/React.createElement("th", null, "Last Name"), /*#__PURE__*/React.createElement("th", null, "Age"), /*#__PURE__*/React.createElement("th", null, "Date of Joining"), /*#__PURE__*/React.createElement("th", null, "Title"), /*#__PURE__*/React.createElement("th", null, "Department"), /*#__PURE__*/React.createElement("th", null, "Employee Type"), /*#__PURE__*/React.createElement("th", null, "Current Status"), /*#__PURE__*/React.createElement("th", null, "Action"))), /*#__PURE__*/React.createElement("tbody", null, EmployeeInfo.map(employee => {
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
          onClick: () => this.handleDelete(employee._id, employee.currentStatus)
        }, "Delete")));
      })))));
    }
  }
}