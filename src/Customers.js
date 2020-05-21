import React, { useState, Component } from 'react';
import axios from 'axios';
import { getToken } from './Utils/Common';
import LogoutBtn from './Components/LogoutBtn'
import MaterialTable from "material-table";

class Customers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: []
    };

    this.saveCustomer = customer => {
      console.log(JSON.stringify(customer));
      const token = getToken();
      const config = {
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        }
      }
      if (customer.id === undefined) {
        axios.post('http://localhost:5000/api/Customers',customer , config)
          .then();
      } else {
        axios.put('http://localhost:5000/api/Customers/' + customer.id,customer , config)
          .then();
      }
    }
  }

  getData = (page, pageSize) => {
    page = page === undefined? 1 : page;
    pageSize = pageSize === undefined? 10 : pageSize;
    const token = getToken();
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    axios.get('http://localhost:5000/api/Customers?Page='+ page + '&PageSize='+pageSize, config)
      .then(customers => this.setState({ 'customers': customers.data.items }))
  }


  componentDidMount() {
    // this.getData();
    // setInterval(this.getData, 5000);
  }

  render() {
    return (
      <div className="w3-container">
        <div className="w3-container w3-right w3-margin">
          <LogoutBtn></LogoutBtn>
        </div>
        <div className="w3-container">
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
                  axios.get('http://localhost:5000/api/Customers?Page='+ (query.page+1) + '&PageSize='+ query.pageSize, config)
                    .then(result => {
                      this.setState({ 'customers': result.data.items });
                      resolve({
                        data: result.data.items,
                        page: result.data.page-1,
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
                      { title: "First Name", field: "firstName" },
                      { title: "Last Name", field: "lastName" },
                      { title: "Job Title", field: "jobTitle" }
                    ]}
                    data={rowData.representatives}
                    editable={{
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
                        data.splice(index, 1);
                        this.setState({ 'customers': data }, () => resolve());
                      }
                      resolve();
                    }, 1000);
                  })
              }}
              options={{
                filtering: false
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Customers;