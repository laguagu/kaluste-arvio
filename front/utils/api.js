import { API_PICTURE, API_PRICE, API_INSTRUCTION_DATA, API_REPAIR } from '@env';

// Get the instructions data from the server.
export const getInstructions = async () => {
  try {
    const resp = await fetch(API_INSTRUCTION_DATA);
    return await resp.json();
  } catch (err) {
    return console.error(err);
  }
};

// The getEstimate function sends a POST request to 2 different endpoints based on the data passed.
// If the data has a brand, it sends the data to the API_PRICE endpoint to get the price estimate.
// If the data does not have a brand and have only picture, it sends the data to the API_PICTURE endpoint
// to get the furniture data such as type, model, brand, colour, dimensions and condition.
export const getEstimate = async (data) => {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    if (Object.keys(data).length === 1) {
      const resp = await fetch(API_PICTURE, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (!resp.ok) throw new Error(`${resp.status} ${resp.statusText}`);
      return await resp.json();
    } else {
      const resp = await fetch(API_PRICE, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (!resp.ok) throw new Error(`${resp.status} ${resp.statusText}`);
      return await resp.json();
    }
  } catch (error) {
    console.error(error);
  }
};

// The getRepair function sends a POST request to the API_REPAIR endpoint 
// to get the repair, restoration or recycling options.
export const getRepair = async (data) => {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    const resp = await fetch(API_REPAIR, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (!resp.ok) throw new Error(`${resp.status} ${resp.statusText}`);
    return await resp.json();
  } catch (error) {
    console.error(error);
  }
};
