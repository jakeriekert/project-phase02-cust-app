import React, { useState, useEffect } from 'react';
import { getAll, post, put, deleteById } from '../memdb.js';
import './App.css'
import { CustomerList } from './CustomerList';
import { CustomerAddUpdateForm } from './CustomerAddUpdateForm';

function log(message){console.log(message);}

export function App(params) {
  let blankCustomer = { "id": -1, "name": "", "email": "", "password": "" };
  //let formObject = customers[0]; - removed from example
  const [customers, setCustomers] = useState([]);
  const [formObject, setFormObject] = useState (blankCustomer);
  let mode = (formObject.id >= 0) ? 'Update' : 'Add';
  useEffect(() => { getCustomers() }, []);

  const getCustomers =  function(){
    log("in getCustomers()");
    setCustomers(getAll());
  }

  const handleListClick = function(item){
    log("in handleListClick()");
    // Toggle selection - deselect/select
    if (formObject.id === item.id){
      setFormObject(blankCustomer);
    } else {
    setFormObject(item);
    }
  }  

  const handleInputChange = function (event) {
    log("in handleInputChange()");
    const name = event.target.name;
    const value = event.target.value;
    let newFormObject = {...formObject}
    newFormObject[name] = value;
    setFormObject(newFormObject);
  }

  let onCancelClick = function () {
    log("in onCancelClick()");
    setFormObject (blankCustomer);
  }

  let onDeleteClick = function () {
    if (formObject.id >= 0) {
      deleteById(formObject.id);   
    }
    setFormObject(blankCustomer);
  }

  let onSaveClick = function () {
    if (mode === 'Add') {
      post(formObject);
    }
    if (mode === 'Update') {
      put(formObject.id, formObject);
    }
    setFormObject(blankCustomer);
    log("in onSaveClick()");
  }

  return (
    <div>
      <CustomerList
        customers={customers}
        selectedCustomerId={formObject.id}
        onSelectCustomer={handleListClick}
      />
      <CustomerAddUpdateForm
        formObject={formObject}
        mode={mode}
        onInputChange={handleInputChange}
        onSaveClick={onSaveClick}
        onDeleteClick={onDeleteClick}
        onCancelClick={onCancelClick}
      />
    </div>
  );
}

export default App;
