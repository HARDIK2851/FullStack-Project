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
        title: "Employee",
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
        title,
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
        currentStatus,
      });
    }
  
    //this is a form, user can use this to enter details of employee data in mongodb database
    render() {
      return (
        <div class="container">
        <h2>Create Employee</h2>
        <form onSubmit={this.formHandler}>
            <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                <label for="firstName">First Name:</label>
                <input type="text" id="firstName" class="form-control" value={this.state.firstName} onChange={(e) => this.setState({ firstName: e.target.value })}/>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                <label for="lastName">Last Name:</label>
                <input type="text" id="lastName" class="form-control" value={this.state.lastName} onChange={(e) => this.setState({ lastName: e.target.value })}/>
                </div>
            </div>
            </div>
            <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                <label for="age">Age:</label>
                <input type="number" id="age" class="form-control" value={this.state.age} onChange={(e) => this.setState({ age: parseInt(e.target.value) })} min="20" max="70"/>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                <label for="dateOfJoining">Date of Joining:</label>
                <input type="date" id="dateOfJoining" class="form-control" value={this.state.dateOfJoining} onChange={(e) => this.setState({ dateOfJoining: e.target.value })}/>
                </div>
            </div>
            </div>
            <div class="form-group">
            <label>Title:</label>
            <div>
                <label><input type="radio" name="title" value="Employee" checked={this.state.title === "Employee"} onChange={(e) => this.setState({ title: e.target.value })} /> Employee</label>
                <label><input type="radio" name="title" value="Manager" checked={this.state.title === "Manager"} onChange={(e) => this.setState({ title: e.target.value })} /> Manager</label>
                <label><input type="radio" name="title" value="Director" checked={this.state.title === "Director"} onChange={(e) => this.setState({ title: e.target.value })} /> Director</label>
                <label><input type="radio" name="title" value="VP" checked={this.state.title === "VP"} onChange={(e) => this.setState({ title: e.target.value })} /> VP</label>
            </div>
            </div>
            <div class="form-group">
            <label>Department:</label>
            <div>
                <label><input type="radio" name="department" value="IT" checked={this.state.department === "IT"} onChange={(e) => this.setState({ department: e.target.value })} /> IT</label>
                <label><input type="radio" name="department" value="Marketing" checked={this.state.department === "Marketing"} onChange={(e) => this.setState({ department: e.target.value })} /> Marketing</label>
                <label><input type="radio" name="department" value="HR" checked={this.state.department === "HR"} onChange={(e) => this.setState({ department: e.target.value })} /> HR</label>
                <label><input type="radio" name="department" value="Engineering" checked={this.state.department === "Engineering"} onChange={(e) => this.setState({ department: e.target.value })} /> Engineering</label>
            </div>
            </div>
            <div class="form-group">
            <label>Employee Type:</label>
            <div>
                <label><input type="radio" id="fullTime" name="employeeType" value="FullTime" checked={this.state.employeeType === "FullTime"} onChange={(e) => this.setState({ employeeType: e.target.value })} /> Full Time</label>
                <label><input type="radio" id="partTime" name="employeeType" value="PartTime" checked={this.state.employeeType === "PartTime"} onChange={(e) => this.setState({ employeeType: e.target.value })} /> Part Time</label>
                <label><input type="radio" id="contract" name="employeeType" value="Contract" checked={this.state.employeeType === "Contract"} onChange={(e) => this.setState({ employeeType: e.target.value })} /> Contract</label>
                <label><input type="radio" id="seasonal" name="employeeType" value="Seasonal" checked={this.state.employeeType === "Seasonal"} onChange={(e) => this.setState({ employeeType: e.target.value })} /> Seasonal</label>
            </div>
            </div>
            <div class="form-group">
              {/* this is the button, when user clickes this button it will call the function formHandler */}
            <button class="btn btn-primary" type="submit">Add Employee</button>
            </div>
        </form>
        </div>

      );
    }
  }