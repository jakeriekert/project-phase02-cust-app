const baseURL = 'http://localhost:4000/customers';

export async function getAll(setCustomers) {
  const myInit = {
    method: 'GET',
    mode: 'cors' };
  const fetchData = async (url) => {
    try {
      const response = await fetch(url, myInit);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
        alert(error);
      }
    }
  fetchData(baseURL);
}

export async function post(customer, callback) {
  // Remove id before POST
  const customerToSend = { ...customer };
  delete customerToSend.id;
  try {
    await fetch(baseURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customerToSend),
    });
    if (callback) callback();
  } catch (error) {
    alert(error);
  }
}

export async function put(id, customer, callback) {
  try {
    await fetch(`${baseURL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer),
    });
    if (callback) callback();
  } catch (error) {
    alert(error);
  }
}

export async function deleteById(id, callback) {
  try {
    await fetch(`${baseURL}/${id}`, { method: 'DELETE' });
    if (callback) callback();
  } catch (error) {
    alert(error);
  }
}