import React, { useEffect, useState } from 'react';

function PnLTable({ username, lastUpdated }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/pnl/${username}`)
            .then(res => res.json())
            .then(setData);
    }, [username, lastUpdated]);

    return (
        <div>
            <h2>Profit & Loss</h2>
            <table>
                <thead>
                <tr>
                    <th>Symbol</th>
                    <th>Remaining Qty</th>
                    <th>Avg Buy</th>
                    <th>Current Price</th>
                    <th>Realized PnL</th>
                    <th>Unrealized PnL</th>
                    <th>Total PnL</th>
                </tr>
                </thead>
                <tbody>
                {data.map(row => (
                    <tr key={row.symbol}>
                        <td>{row.symbol}</td>
                        <td>{row.remainingQty}</td>
                        <td>${parseFloat(row.avgBuyPrice).toFixed(2)}</td>
                        <td>${parseFloat(row.currentPrice || 0).toFixed(2)}</td>
                        <td>${parseFloat(row.realizedPnL).toFixed(2)}</td>
                        <td>${parseFloat(row.unrealizedPnL).toFixed(2)}</td>
                        <td>${parseFloat(row.totalPnL).toFixed(2)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default PnLTable;