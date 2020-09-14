import axios from 'axios';

const instance = axios.create(
    {
        baseURL : 'https://react-my-burger-167c9.firebaseio.com/'
    });

export default instance;

//the reason why we create an instance instead of setting defualts globally for this endpoint because latter, we will use different endpoint for authentication