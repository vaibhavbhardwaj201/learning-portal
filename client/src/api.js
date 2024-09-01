// api.js
export const storeUserData = async (user, formData) => {
  const fullPhoneNumber = formData.countryCode + ' ' + formData.phone;

  try {
    const response = await fetch('http://127.0.0.1:5001/learning-portal-a24ec/us-central1/storeUserData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await user.getIdToken()}`,
      },
      body: JSON.stringify({ ...formData, phone: fullPhoneNumber }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Response from Cloud Function:', data);
    return data;
  } catch (error) {
    console.error('Error storing user data:', error);
    throw error;
  }
};
