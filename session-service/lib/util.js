const axios = require('axios');

async function checkExistance(id, serviceUrl) {

    try {
        const response = await axios.get(`${serviceUrl}/${id}`);
        return response.data.exists; 
    } catch (error) {
        console.error('Error checking existence:', error);
        return false;
    }
}

module.exports = {
    checkExistance
};