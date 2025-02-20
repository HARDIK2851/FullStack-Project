import React from 'react';
export default class EmployeeCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      age: 20,
      dateOfJoining: "",
      department: "IT",
      employeeType: "FullTime",
      currentStatus: 1,
      title: "Employee"
    };
    this.formHandler = this.formHandler.bind(this);
  }

  // this function will be called when user submits the form by clicking add employee button
  formHandler(e) {
    e.preventDefault();
    const {
      firstName,
      lastName,
      age,
      dateOfJoining,
      department,
      employeeType,
      currentStatus,
      title
    } = this.state;
    //this will check for null values in name, last name and date of joining
    if (!firstName || !lastName || !dateOfJoining) {
      alert("Please fill in all fields.");
      return;
    }
    this.props.insertEmp({
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

  //this is a form, user can use this to enter details of employee data in mongodb database
  render() {
    return /*#__PURE__*/React.createElement("div", {
      class: "container"
    }, /*#__PURE__*/React.createElement("h2", null, "Create Employee"), /*#__PURE__*/React.createElement("form", {
      onSubmit: this.formHandler
    }, /*#__PURE__*/React.createElement("div", {
      class: "row"
    }, /*#__PURE__*/React.createElement("div", {
      class: "col-md-6"
    }, /*#__PURE__*/React.createElement("div", {
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
    }))), /*#__PURE__*/React.createElement("div", {
      class: "col-md-6"
    }, /*#__PURE__*/React.createElement("div", {
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
    })))), /*#__PURE__*/React.createElement("div", {
      class: "row"
    }, /*#__PURE__*/React.createElement("div", {
      class: "col-md-6"
    }, /*#__PURE__*/React.createElement("div", {
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
    }))), /*#__PURE__*/React.createElement("div", {
      class: "col-md-6"
    }, /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      for: "dateOfJoining"
    }, "Date of Joining:"), /*#__PURE__*/React.createElement("input", {
      type: "date",
      id: "dateOfJoining",
      class: "form-control",
      value: this.state.dateOfJoining,
      onChange: e => this.setState({
        dateOfJoining: e.target.value
      })
    })))), /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "Title:"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: "title",
      value: "Employee",
      checked: this.state.title === "Employee",
      onChange: e => this.setState({
        title: e.target.value
      })
    }), " Employee"), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: "title",
      value: "Manager",
      checked: this.state.title === "Manager",
      onChange: e => this.setState({
        title: e.target.value
      })
    }), " Manager"), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: "title",
      value: "Director",
      checked: this.state.title === "Director",
      onChange: e => this.setState({
        title: e.target.value
      })
    }), " Director"), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: "title",
      value: "VP",
      checked: this.state.title === "VP",
      onChange: e => this.setState({
        title: e.target.value
      })
    }), " VP"))), /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "Department:"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: "department",
      value: "IT",
      checked: this.state.department === "IT",
      onChange: e => this.setState({
        department: e.target.value
      })
    }), " IT"), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: "department",
      value: "Marketing",
      checked: this.state.department === "Marketing",
      onChange: e => this.setState({
        department: e.target.value
      })
    }), " Marketing"), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: "department",
      value: "HR",
      checked: this.state.department === "HR",
      onChange: e => this.setState({
        department: e.target.value
      })
    }), " HR"), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: "department",
      value: "Engineering",
      checked: this.state.department === "Engineering",
      onChange: e => this.setState({
        department: e.target.value
      })
    }), " Engineering"))), /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "Employee Type:"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      id: "fullTime",
      name: "employeeType",
      value: "FullTime",
      checked: this.state.employeeType === "FullTime",
      onChange: e => this.setState({
        employeeType: e.target.value
      })
    }), " Full Time"), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      id: "partTime",
      name: "employeeType",
      value: "PartTime",
      checked: this.state.employeeType === "PartTime",
      onChange: e => this.setState({
        employeeType: e.target.value
      })
    }), " Part Time"), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      id: "contract",
      name: "employeeType",
      value: "Contract",
      checked: this.state.employeeType === "Contract",
      onChange: e => this.setState({
        employeeType: e.target.value
      })
    }), " Contract"), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      id: "seasonal",
      name: "employeeType",
      value: "Seasonal",
      checked: this.state.employeeType === "Seasonal",
      onChange: e => this.setState({
        employeeType: e.target.value
      })
    }), " Seasonal"))), /*#__PURE__*/React.createElement("div", {
      class: "form-group"
    }, /*#__PURE__*/React.createElement("button", {
      class: "btn btn-primary",
      type: "submit"
    }, "Add Employee"))));
  }
}