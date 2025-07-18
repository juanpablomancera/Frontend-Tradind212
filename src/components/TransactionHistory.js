import React, { useEffect, useState } from 'react';

function TransactionHistory({ data }) {
    return (
        <div>
            <h2>Transactions</h2>
            <table>
                <thead>
                <tr>
                    <th>Type</th>
                    <th>Symbol</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Time</th>
                </tr>
                </thead>
                <tbody>
                {data.map(tx => (
                    <tr key={tx.id}>
                        <td>{tx.type}</td>
                        <td>{tx.cryptoSymbol}</td>
                        <td>{tx.quantity}</td>
                        <td>${tx.price}</td>
                        <td>{new Date(tx.timestamp).toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}


export default TransactionHistory;