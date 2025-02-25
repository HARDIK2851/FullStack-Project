//this class will create a component to enter employee details with some predefine values
import React from 'react';
import { BrowserRouter as Router, Route,Routes, Link } from 'react-router-dom';
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import EmployeeCreate from './src/EmployeeCreate';
import EmployeeTable from './src/EmployeeTable';
import EmployeeUpdate from './src/EmployeeUpdate';
import UpcomingRetirementTable from './src/UpcomingRetirementTable';

// this function will send an graphql request
export function graphqlRequest(queryString, variableValue = {}) {
  return fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: queryString, variables: variableValue }),
  })
    .then((res) => res.json())
    .then((dbData) => {
      if (dbData.validateField) {
        handleGraphQLFormError(dbData.validateField);
      }
      return dbData.data;
    })
    .catch((e) => {
      alert(`Error in processing request: ${e.message}`);
    });
}
// this will show erro if there is any
function handleGraphQLFormError(validateField) {
  const error = validateField[0];
  if (error.extensions.code === "BAD_USER_INPUT") {
    const details = error.extensions.validateField.join("\n ");
    alert(`${error.message}:\n ${details}`);
  } else {
    alert(`${error.extensions.code}: ${error.message}`);
  }
}

// this class component contains all other components
class EmployeeDirectory extends React.Component {
  constructor() {
    super();
    this.state = {employeeData: [], 
      updatedEmployeeData: [],
      isEditing: false, // New state to track whether editing mode is active
      selectedEmployee: null,};
    this.componentDidMount = this.componentDidMount.bind(this);
    this.addEmployeeData = this.addEmployeeData.bind(this);
    this.addEmployee = this.addEmployee.bind(this);
    this.updateEmployeeData = this.updateEmployeeData.bind(this);
    this.updateEmployee = this.updateEmployee.bind(this);
    this.updateEmployeeInfo = this.updateEmployeeInfo.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  componentDidMount() {
    const getQuery = `query getEmployeeInfo {
      getEmployeeInfo {
        _id
        age
        currentStatus
        dateOfJoining
        department
        employeeType
        firstName
        lastName
        title
      }
    }`;
    graphqlRequest(getQuery).then((response) => {
      this.setState({
        employeeData: response.getEmployeeInfo,
      });
    });
  }

  // this function is called when user has filled all the data in EmployeeCreat form
  // then it will use graphql query to store that data in mondodb cluster

  addEmployeeData(employee) {
    const empInfo = { ...employee };
    empInfo.dateOfJoining = new Date(empInfo.dateOfJoining).toISOString();
    delete empInfo.validateField;

    const updateQuery = `
        mutation insertData($result: inputTypeEmp)
        {
         insertData(result: $result)
          {
           _id  
           currentStatus
           age
           department
           dateOfJoining
           employeeType
           firstName
           lastName
           title
         }
       }`;
    this.addEmployee(updateQuery, empInfo).then((resultAdded) => {
      this.setState({
        employeeData: [
          ...this.state.employeeData,
          { ...resultAdded.insertData },
        ],
      });
      alert(`Data Added Successfully.`);
    });
  }

  // this function will be called when user presses the update employee button in EmployeeUpdate Component after filling all feilds 
  updateEmployeeData(empdata) {
    const empInfo = { ...empdata };
    console.log(empdata);
    delete empdata.validateField;
    const query = `
    mutation updateDataIntoMongoDB($result: inputUpdatedTypeEmp!) {
      updateDataIntoMongoDB(result: $result) {
        _id
        lastName
        firstName
        age
        dateOfJoining
        title
        department
        employeeType
        currentStatus
      }
    }`;

    this.updateEmployee(query, empInfo).then((resultAdded) => {
      this.setState({
        employeeData: [
          ...this.state.employeeData,
          { ...resultAdded.insertData },
        ],
      });
      alert(`Data Updated Successfully.`);
    });
}


  addEmployee(query, result) {
    return graphqlRequest(query, { result });
  }

  updateEmployee(query, result) {
    return graphqlRequest(query, { result });
  }
  
  updateEmployeeInfo(updatedData) {
    this.setState({ employeeData: updatedData });
}

toggleEdit(employee) {
  // this will selete the data of employee which is choosen for the updation
  this.setState(() => ({
    selectedEmployee: employee
  }));
}

  render() {

    const { employeeData, isEditing, selectedEmployee } = this.state;
    
    return (
      <Router>
        <div>

          {/* this is the navbar created with help of bootstrap to make it look good */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
              <Link className="navbar-brand font-weight-bold" to="/create">Create Employee</Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link font-weight-bold" to="/">Employee Table</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link font-weight-bold" to="/retiringEmployeeTable">Upcoming Retirements</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          {/* this are the routes for the nav bar, whenever someone clicks on the Link which contains any of this route's path, 
          it will redirect it to appropriate component */}
          <hr />
          <Routes>
            {/* this route is for EmployeeCreate component */}
          <Route
            exact
            path="/create"
            element={
              <EmployeeCreate
              insertEmp={this.addEmployeeData}
              />
            }
          />
          {/* this route is for EmployeeTable component */}
          <Route
            path="/"
            element={
              <EmployeeTable
              EmployeeInfo={this.state.employeeData}
              updateEmployeeInfo={this.updateEmployeeInfo}
              toggleEdit={this.toggleEdit}
              />
            }
          />
          {/* this route is for the UpcomingRetirementTable component */}
          <Route
            path="/retiringEmployeeTable"
            element={
              <UpcomingRetirementTable
              EmployeeInfo={this.state.employeeData}
              updateEmployeeInfo={this.updateEmployeeInfo}
              toggleEdit={this.toggleEdit}
              />
            }
          />

          {/* this route is for the EmployeeUpdate component */}
          <Route
            path="/update"
            element={
              <EmployeeUpdate
                
                // updateEmployeeInfo={this.updateEmployeeInfo}
                // isEditing={isEditing}
                selectedEmployee={selectedEmployee}
                // toggleEdit={this.toggleEdit}
                updateCurrentEmployee={this.updateEmployeeData}
                employee={selectedEmployee}
              />
            }
          />
          </Routes>
        </div>
      </Router>
    );
  }
}

// ReactDOM.render(<EmployeeDirectory/>, document.getElementById("content"));
const root = ReactDOM.createRoot(document.getElementById('content'));
root.render(<EmployeeDirectory />);