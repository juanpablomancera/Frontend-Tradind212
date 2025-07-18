import React from 'react';

function Holdings({ data }) {
    return (
        <div>
            <h2>Holdings</h2>
            <ul>
                {data.map(h => (
                    <li key={h.cryptoSymbol}>{h.cryptoSymbol}: {h.quantity}</li>
                ))}
            </ul>
        </div>
    );
}


export default Holdings;