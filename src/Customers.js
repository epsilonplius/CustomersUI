import React, { useState, Component } from 'react';
import axios from 'axios';
import { getToken } from './Utils/Common';
import LogoutBtn from './Components/LogoutBtn'
import MaterialTable from "material-table";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';

class Customers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      showErrorMessage: true,
      errorMessage: ""
    };

    this.baseApiUrl = 'http://localhost:5000/api/Customers';

    this.handleClose = (event, reason) => {
      this.setState({ 'showErrorMessage': false })
    };

    this.deleteCustomer = customer => {
      const token = getToken();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      axios.delete(this.baseApiUrl + '/' + customer.id, config)
        .then()
        .catch(function (error) {
          
        })
        ;
    }

    this.saveCustomer = customer => {
      const token = getToken();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      if (customer.id === undefined) {
        axios.post(this.baseApiUrl, customer, config)
          .then();
      } else {
        axios.put(this.baseApiUrl + '/' + customer.id, customer, config)
          .then();
      }
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="w3-container">
        <div className="w3-container w3-right w3-margin">
          <LogoutBtn></LogoutBtn>
        </div>
        <div className="w3-container">
          <Snackbar open={this.state.showErrorMessage} autoHideDuration={6000} onClose={this.handleClose}>
            <Alert severity="error" onClose={() => { }}>This is an error alert — check it out!</Alert>
          </Snackbar>
          <div style={{ maxWidth: "100%" }}>
            <MaterialTable
              columns={[
                { title: "Name", field: "name" },
                { title: "Address", field: "address" },
              ]}
              data={query =>
                new Promise((resolve, reject) => {
                  const token = getToken();
                  const config = {
                    headers: { Authorization: `Bearer ${token}` }
                  }
                  axios.get(this.baseApiUrl + '?Page=' + (query.page + 1) + '&PageSize=' + query.pageSize, config)
                    .then(result => {
                      this.setState({ 'customers': result.data.items });
                      resolve({
                        data: result.data.items,
                        page: result.data.page - 1,
                        pageSize: result.data.pageSize,
                        totalCount: result.data.total
                      });
                    })
                })
              }
              title="Customers"
              actions={[
                {
                  icon: 'save',
                  tooltip: 'Save Customer',
                  onClick: (event, rowData) => { this.saveCustomer(rowData) }
                }
              ]}
              detailPanel={rowData => {
                return (
                  <MaterialTable
                    title="Representatives"
                    options={{
                      search: false
                    }}
                    columns={[
                      { title: "", field: "avatar", editable: 'never',render: rowData => <Avatar>{rowData.firstName.charAt(0).toUpperCase()}{rowData.lastName.charAt(0).toUpperCase()}</Avatar> },
                      { title: "First Name", field: "firstName" },
                      { title: "Last Name", field: "lastName" },
                      { title: "Job Title", field: "jobTitle" }
                    ]}
                    data={rowData.representatives}
                    editable={{
                      isEditable: rowData => rowData.name !== "avatar",
                      onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                          setTimeout(() => {
                            {
                              const data = this.state.customers;
                              data.find(a => a.id === rowData.id).representatives.push(newData);
                              this.setState({ 'customers': data }, () => resolve());
                            }
                            resolve();
                          }, 1000);
                        }),
                      onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                          setTimeout(() => {
                            {
                              const data = this.state.customers;
                              const index = data.find(a => a.id === rowData.id).representatives.indexOf(oldData);
                              data.find(a => a.id === rowData.id).representatives[index] = newData;
                              this.setState({ 'customers': data }, () => resolve());
                            }
                            resolve();
                          }, 1000);
                        }),
                      onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                          setTimeout(() => {
                            {
                              let data = this.state.customers;
                              const index = data.indexOf(oldData);
                              data.find(a => a.id === rowData.id).representatives.splice(index, 1);
                              this.setState({ 'customers': data }, () => resolve());
                            }
                            resolve();
                          }, 1000);
                        })
                    }}
                  />
                )
              }}
              onRowClick={(event, rowData, togglePanel) => togglePanel()}
              editable={{
                onRowAdd: newData =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      {
                        const data = this.state.customers;
                        data.push(newData);
                        this.setState({ 'customers': data }, () => resolve());
                      }
                      resolve();
                    }, 1000);
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      {
                        const data = this.state.customers;
                        const index = data.indexOf(oldData);
                        data[index] = newData;
                        this.setState({ 'customers': data }, () => resolve());
                      }
                      resolve();
                    }, 1000);
                  }),
                onRowDelete: oldData =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      {
                        let data = this.state.customers;
                        const index = data.indexOf(oldData);
                        this.deleteCustomer(this.state.customers[index]);
                        data.splice(index, 1);
                        this.setState({ 'customers': data }, () => resolve());
                      }
                      resolve();
                    }, 1000);
                  })
              }}
              options={{
                filtering: false,
                paginationType: 'stepped',
                pageSizeOptions: [10, 20, 50],
                pageSize: 10
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Customers;