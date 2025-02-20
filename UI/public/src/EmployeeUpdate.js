import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
export default class EmployeeUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: props.employee._id,
      firstName: props.employee.firstName,
      lastName: props.employee.lastName,
      age: props.employee.age,
      dateOfJoining: props.employee.dateOfJoining,
      department: props.employee.department,
      employeeType: props.employee.employeeType,
      title: props.employee.title,
      currentStatus: 1
    };
    this.formHandler = this.formHandler.bind(this);
  }
  formHandler(e) {
    e.preventDefault();
    const {
      _id,
      firstName,
      lastName,
      age,
      dateOfJoining,
      department,
      employeeType,
      title,
      currentStatus
    } = this.state;

    // this will check for null valus in any field
    if (!firstName || !lastName || !dateOfJoining) {
      alert("Please fill in all fields.");
      return;
    }

    // this will create an object whith updated employee data, entered by user
    this.props.updateCurrentEmployee({
      _id,
      firstName,
      lastName,
      age,
      dateOfJoining,
      department,
      employeeType,
      title,
      currentStatus
    });
  }
  render() {
    return /*#__PURE__*/React.createElement("div", {
      class: "container"
    }, /*#__PURE__*/React.createElement("h2", null, "Edit Employee"), /*#__PURE__*/React.createElement("form", {
      onSubmit: this.formHandler
    }, /*#__PURE__*/React.createElement("input", {
      id: "_id",
      type: "text",
      value: this.state._id,
      hidden: true,
      onChange: e => this.setState({
        _id: e.target.value
      })
    }), /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      for: "firstName"
    }, "First Name:"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "firstName",
      class: "form-control",
      value: this.state.firstName,
      onChange: e => this.setState({
        firstName: e.target.value
      })
    })), /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      for: "lastName"
    }, "Last Name:"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "lastName",
      class: "form-control",
      value: this.state.lastName,
      onChange: e => this.setState({
        lastName: e.target.value
      })
    })), /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      for: "age"
    }, "Age:"), /*#__PURE__*/React.createElement("input", {
      type: "number",
      id: "age",
      class: "form-control",
      value: this.state.age,
      onChange: e => this.setState({
        age: parseInt(e.target.value)
      }),
      min: "20",
      max: "70"
    })), /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      for: "dateOfJoining"
    }, "Date of Joining:"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "dateOfJoining",
      class: "form-control",
      value: this.state.dateOfJoining,
      onChange: e => this.setState({
        dateOfJoining: e.target.value
      }),
      disabled: true
    })), /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "Title:"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      class: "mr-3"
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: "title",
      value: "Employee",
      checked: this.state.title === "Employee",
      onChange: e => this.setState({
        title: e.target.value
      }),
      class: "mr-1"
    }), " ", "Employee"), /*#__PURE__*/React.createElement("label", {
      class: "mr-3"
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: "title",
      value: "Manager",
      checked: this.state.title === "Manager",
      onChange: e => this.setState({
        title: e.target.value
      }),
      class: "mr-1"
    }), " ", "Manager"), /*#__PURE__*/React.createElement("label", {
      class: "mr-3"
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: "title",
      value: "Director",
      checked: this.state.title === "Director",
      onChange: e => this.setState({
        title: e.target.value
      }),
      class: "mr-1"
    }), " ", "Director"), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: "title",
      value: "VP",
      checked: this.state.title === "VP",
      onChange: e => this.setState({
        title: e.target.value
      }),
      class: "mr-1"
    }), " ", "VP"))), /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "Department:"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      class: "mr-3"
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: "department",
      value: "IT",
      checked: this.state.department === "IT",
      onChange: e => this.setState({
        department: e.target.value
      }),
      class: "mr-1"
    }), " ", "IT"), /*#__PURE__*/React.createElement("label", {
      class: "mr-3"
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: "department",
      value: "Marketing",
      checked: this.state.department === "Marketing",
      onChange: e => this.setState({
        department: e.target.value
      }),
      class: "mr-1"
    }), " ", "Marketing"), /*#__PURE__*/React.createElement("label", {
      class: "mr-3"
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: "department",
      value: "HR",
      checked: this.state.department === "HR",
      onChange: e => this.setState({
        department: e.target.value
      }),
      class: "mr-1"
    }), " ", "HR"), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: "department",
      value: "Engineering",
      checked: this.state.department === "Engineering",
      onChange: e => this.setState({
        department: e.target.value
      }),
      class: "mr-1"
    }), " ", "Engineering"))), /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "Employee Type:"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      class: "mr-3"
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      id: "fullTime",
      name: "employeeType",
      value: "FullTime",
      checked: this.state.employeeType === "FullTime",
      onChange: e => this.setState({
        employeeType: e.target.value
      }),
      class: "mr-1"
    }), " ", "Full Time"), /*#__PURE__*/React.createElement("label", {
      class: "mr-3"
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      id: "partTime",
      name: "employeeType",
      value: "PartTime",
      checked: this.state.employeeType === "PartTime",
      onChange: e => this.setState({
        employeeType: e.target.value
      }),
      class: "mr-1"
    }), " ", "Part Time"), /*#__PURE__*/React.createElement("label", {
      class: "mr-3"
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      id: "contract",
      name: "employeeType",
      value: "Contract",
      checked: this.state.employeeType === "Contract",
      onChange: e => this.setState({
        employeeType: e.target.value
      }),
      class: "mr-1"
    }), " ", "Contract"), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      id: "seasonal",
      name: "employeeType",
      value: "Seasonal",
      checked: this.state.employeeType === "Seasonal",
      onChange: e => this.setState({
        employeeType: e.target.value
      }),
      class: "mr-1"
    }), " ", "Seasonal")), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "currentStatus"
    }, "Current Status:"), /*#__PURE__*/React.createElement("select", {
      id: "currentStatus",
      className: "form-control",
      value: this.state.currentStatus,
      onChange: e => this.setState({
        currentStatus: parseInt(e.target.value)
      })
    }, /*#__PURE__*/React.createElement("option", {
      value: 1
    }, "Active"), /*#__PURE__*/React.createElement("option", {
      value: 0
    }, "Retired")))), /*#__PURE__*/React.createElement("button", {
      type: "submit",
      class: "btn btn-primary"
    }, "Update Employee")));
  }
}