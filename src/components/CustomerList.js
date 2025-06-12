import React from 'react';
//import { formObject, handleListClick } from '../App.js'

export function CustomerList({ customers, selectedCustomerId, onSelectCustomer }) {
  return (
      <div className="boxed" >
        <h4>Customer List</h4>
        <table id="customer-list">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Pass</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(
              (item, index) => {
                return (<tr key={item.id} 
                className={ (item.id === selectedCustomerId) ?'selected': ''}  
                onClick={()=>onSelectCustomer(item)} 
                >
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.password}</td>
                </tr>);
              }
            )}
          </tbody>
        </table>
    </div>
  );
}
