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
      currentStatus: 1,
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
      currentStatus,
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
      currentStatus,
    });
  }

  render() {
    return (
      <div class="container">
        <h2>Edit Employee</h2>
        <form onSubmit={this.formHandler}>
          <input id="_id" type="text" value={this.state._id} hidden onChange={(e) => this.setState({ _id: e.target.value })}/>
          <div class="form-group">
            <label for="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              class="form-control"
              value={this.state.firstName}
              onChange={(e) => this.setState({ firstName: e.target.value })}
            />
          </div>

          <div class="form-group">
            <label for="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              class="form-control"
              value={this.state.lastName}
              onChange={(e) => this.setState({ lastName: e.target.value })}
            />
          </div>

          <div class="form-group">
            <label for="age">Age:</label>
            <input
              type="number"
              id="age"
              class="form-control"
              value={this.state.age}
              onChange={(e) => this.setState({ age: parseInt(e.target.value) })}
              min="20"
              max="70"
            />
          </div>

          <div class="form-group">
            <label for="dateOfJoining">Date of Joining:</label>
            <input
              type="text"
              id="dateOfJoining"
              class="form-control"
              value={this.state.dateOfJoining}
              onChange={(e) => this.setState({ dateOfJoining: e.target.value })}
              disabled
            />
          </div>

          <div class="form-group">
            <label>Title:</label>
            <div>
              <label class="mr-3">
                <input
                  type="radio"
                  name="title"
                  value="Employee"
                  checked={this.state.title === "Employee"}
                  onChange={(e) => this.setState({ title: e.target.value })}
                  class="mr-1"
                />{" "}
                Employee
              </label>
              <label class="mr-3">
                <input
                  type="radio"
                  name="title"
                  value="Manager"
                  checked={this.state.title === "Manager"}
                  onChange={(e) => this.setState({ title: e.target.value })}
                  class="mr-1"
                />{" "}
                Manager
              </label>
              <label class="mr-3">
                <input
                  type="radio"
                  name="title"
                  value="Director"
                  checked={this.state.title === "Director"}
                  onChange={(e) => this.setState({ title: e.target.value })}
                  class="mr-1"
                />{" "}
                Director
              </label>
              <label>
                <input
                  type="radio"
                  name="title"
                  value="VP"
                  checked={this.state.title === "VP"}
                  onChange={(e) => this.setState({ title: e.target.value })}
                  class="mr-1"
                />{" "}
                VP
              </label>
            </div>
          </div>

          <div class="form-group">
            <label>Department:</label>
            <div>
              <label class="mr-3">
                <input
                  type="radio"
                  name="department"
                  value="IT"
                  checked={this.state.department === "IT"}
                  onChange={(e) =>
                    this.setState({ department: e.target.value })
                  }
                  class="mr-1"
                />{" "}
                IT
              </label>
              <label class="mr-3">
                <input
                  type="radio"
                  name="department"
                  value="Marketing"
                  checked={this.state.department === "Marketing"}
                  onChange={(e) =>
                    this.setState({ department: e.target.value })
                  }
                  class="mr-1"
                />{" "}
                Marketing
              </label>
              <label class="mr-3">
                <input
                  type="radio"
                  name="department"
                  value="HR"
                  checked={this.state.department === "HR"}
                  onChange={(e) =>
                    this.setState({ department: e.target.value })
                  }
                  class="mr-1"
                />{" "}
                HR
              </label>
              <label>
                <input
                  type="radio"
                  name="department"
                  value="Engineering"
                  checked={this.state.department === "Engineering"}
                  onChange={(e) =>
                    this.setState({ department: e.target.value })
                  }
                  class="mr-1"
                />{" "}
                Engineering
              </label>
            </div>
          </div>

          <div class="form-group">
            <label>Employee Type:</label>
            <div>
              <label class="mr-3">
                <input
                  type="radio"
                  id="fullTime"
                  name="employeeType"
                  value="FullTime"
                  checked={this.state.employeeType === "FullTime"}
                  onChange={(e) =>
                    this.setState({ employeeType: e.target.value })
                  }
                  class="mr-1"
                />{" "}
                Full Time
              </label>
              <label class="mr-3">
                <input
                  type="radio"
                  id="partTime"
                  name="employeeType"
                  value="PartTime"
                  checked={this.state.employeeType === "PartTime"}
                  onChange={(e) =>
                    this.setState({ employeeType: e.target.value })
                  }
                  class="mr-1"
                />{" "}
                Part Time
              </label>
              <label class="mr-3">
                <input
                  type="radio"
                  id="contract"
                  name="employeeType"
                  value="Contract"
                  checked={this.state.employeeType === "Contract"}
                  onChange={(e) =>
                    this.setState({ employeeType: e.target.value })
                  }
                  class="mr-1"
                />{" "}
                Contract
              </label>
              <label>
                <input
                  type="radio"
                  id="seasonal"
                  name="employeeType"
                  value="Seasonal"
                  checked={this.state.employeeType === "Seasonal"}
                  onChange={(e) =>
                    this.setState({ employeeType: e.target.value })
                  }
                  class="mr-1"
                />{" "}
                Seasonal
              </label>
            </div>
            <div className="form-group">
            <label htmlFor="currentStatus">Current Status:</label>
            <select
              id="currentStatus"
              className="form-control"
              value={this.state.currentStatus}
              onChange={(e) =>
                this.setState({ currentStatus: parseInt(e.target.value) })
              }
            >
              <option value={1}>Active</option>
              <option value={0}>Retired</option>
            </select>
          </div>
          </div>

          <button type="submit" class="btn btn-primary">
            Update Employee
          </button>
        </form>
      </div>
    );
  }
}
