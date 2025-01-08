import axios from 'axios';
const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password
      },
      headers: {
        'Content-Type': 'application/json', // Set Content-Type to JSON
        'Authorization': `Bearer ${yourToken}` // If you are using a bearer token
      },
      withCredentials: true, // Ensure that cookies are included in the request
    });

    if (res.data.status === 'success') {
      setTimeout(() => location.assign('/'), 1500); // Redirect or success handling
    }
  } catch (err) {
    console.error('Login error:', err.response?.data || err.message);
  }
};

export const logout=async()=>{

  try {
    const res = await axios({
      method: 'POST',
      url: 'api/v1/users/logout',

    });
  if(res.data.status=='success'){ location.reload(true)}
  }
  catch(err){
  
    alert('error','Error logging out try again')
  }
}
