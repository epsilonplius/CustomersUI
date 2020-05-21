import React from 'react';

const Table = (customers) => {

  const removeBtn = (i, index) =>{
    customers.customers.splice(index,1);
    i.name= 'aaaaaaaaaa'; 
  }

  return (
    <table className="w3-table-all w3-hoverable w3-card">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Address</th>
          <th>Representatives</th>
        </tr>
      </thead>
      <tbody>
        {customers.customers.map((customer, index) => {
          return (
            <tr key={index}>
              <td><button onClick = {i=>removeBtn(i, index)}><i class="fa fa-trash"></i></button></td>
              <td>{customer.name}</td>
              <td>{customer.address}</td>
              <td>
                
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  );
}

export default Table