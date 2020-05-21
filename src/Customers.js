import React, { useState, Component } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { getToken, removeUserSession } from './Utils/Common';
import Table from './Components/Table';
import LogoutBtn from './Components/LogoutBtn'

class Customers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      fname: "",
      faddress: ""
    };

    this.AddBtn = c => {
      c.preventDefault();
      if (this.state.fname !== '') {
        const customers = this.state.customers;
        customers.push({
          name: this.state.fname,
          address: this.state.faddress
        });
        this.setState({ 'customers': customers, 'fname': '', 'faddress': '' });
      }
    }

    this.removeBtn = i =>{
      alert("nieko");
    }
  }

  componentDidMount() {
    const token = getToken();
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    axios.get('http://localhost:5000/api/Customers', config)
      .then(customers => this.setState({ 'customers': customers.data.items }))
  }

  render() {
    return (
      <div className="w3-container">
        <div className="w3-container w3-right w3-margin">
          <LogoutBtn></LogoutBtn>
        </div>
        <div className="w3-container w3-margin">
          <form className="w3-container" onSubmit={this.AddBtn}>
            <div className="w3-row-padding">
              <div className="w3-third">
                <label>Name</label>
                <input className="w3-input w3-border" type="text" value={this.state.fname} onChange={e => this.setState({ 'fname': e.target.value })} />
              </div>
              <div className="w3-third">
                <label>Last Name</label>
                <input className="w3-input w3-border" type="text" value={this.state.faddress} onChange={e => this.setState({ 'faddress': e.target.value })} />
              </div>
              <div className="w3-rest">
                <input type="submit" className="w3-btn w3-blue w3-input" value="+" />
              </div>
            </div>
          </form>
        </div>
        <div className="w3-container">
          <Table customers={this.state.customers}></Table>
        </div>
      </div>
    )
  }
}

export default Customers;