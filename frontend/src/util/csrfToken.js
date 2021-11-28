import React from 'react';
import getCookie from './getCookie';

const csrftoken = getCookie('csrftoken');

const CSRFToken = () => (
    <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
);

export default CSRFToken;
