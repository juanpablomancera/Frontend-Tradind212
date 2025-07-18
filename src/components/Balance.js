import React from 'react';

function Balance({ value }) {
    return <h3>Balance: ${parseFloat(value).toFixed(2)}</h3>;
}

export default Balance;