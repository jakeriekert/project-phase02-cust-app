import React, { useState, useEffect } from 'react';
//import { getAll, post, put, deleteById } from './memdb.js';
import { getAll, post, put, deleteById } from './restdb.js'; // new imort for REST
import './App.css'
import { CustomerList } from './components/CustomerList.js';
import { CustomerAddUpdateForm } from './components/CustomerAddUpdateForm.js';

function log(message){console.log(message);}

export function App(params) {
  let blankCustomer = { "id": -1, "name": "", "email": "", "password": "" };
  //let formObject = customers[0]; - removed from example
  const [customers, setCustomers] = useState([]);
  const [formObject, setFormObject] = useState (blankCustomer);
  let mode = (formObject.id >= 0) ? 'Update' : 'Add';
  useEffect(() => { getCustomers() }, [formObject]); // added formObject

/* OLD getAll

  const getCustomers =  function(){
    log("in getCustomers()");
    setCustomers(getAll());
  } */
 
  // NEW getCustomers
  const getCustomers = function() {
    log("in getCustomers()");
    getAll(setCustomers);
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

/* OLD DeleteByID

  let onDeleteClick = function () {
    if (formObject.id >= 0) {
      deleteById(formObject.id);   
    }
    setFormObject(blankCustomer);
  }
 */

// NEW DeleteById
  let onDeleteClick = function () {
    let postOpCallback = () => { setFormObject(blankCustomer); }
    if (formObject.id >= 0) {
      deleteById(formObject.id, postOpCallback);
    } else {
      setFormObject(blankCustomer);
    }
  }

/* OLD onSaveClick  
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
 */

// NEW onSaveClick
  let onSaveClick = function () {
    if (mode === 'Add') {
      post(formObject, () => setFormObject(blankCustomer));
    }
    if (mode === 'Update') {
      put(formObject.id, formObject, () => setFormObject(blankCustomer));
    }
    log("in onSaveClick()");
  };

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
