"use strict";

module.exports = async (url, method = 'GET', data = null) => {

    try {
        const headers = {};
        let body;

        if (data) {
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(data)
        }

        if (method === 'DELETE') {
            headers['Accept'] = '*/*';
            headers['Connection'] = 'keep-alive';
        }

        const response = await fetch(url, {
            method,
            headers,
            body
        });

        return response.json();

    } catch (err) {
        console.warn('Error when make request', err.message);
    }

}