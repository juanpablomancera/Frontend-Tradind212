import React from 'react';

function PriceTable({ prices }) {
    return (
        <div className="price-table">
            <h2>Live Prices</h2>
            <table>
                <thead>
                <tr>
                    <th>Pair</th>
                    <th>Price (USD)</th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(prices).map(([pair, price]) => (
                    <tr key={pair}>
                        <td>{pair}</td>
                        <td>${price}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default PriceTable;