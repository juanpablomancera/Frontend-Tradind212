import React, { useState } from 'react';
import { tradeCrypto } from '../services/api';

function TradeForm({ prices, username, onTrade }) {
    const [symbol, setSymbol] = useState('BTC/USD');
    const [quantity, setQuantity] = useState('');
    const [type, setType] = useState('BUY');
    const [message, setMessage] = useState('');

    const handleTrade = async (e) => {
        e.preventDefault();
        const price = parseFloat(prices[symbol]);

        if (!price || !quantity || quantity <= 0) {
            setMessage('Invalid input');
            return;
        }

        try {
            const res = await tradeCrypto({ username, symbol, price, quantity }, type);
            setMessage(res);
            onTrade();
        } catch (err) {
            setMessage(err.message);
        }
    };

    return (
        <div className="trade-form">
            <h2>Trade</h2>
            <form onSubmit={handleTrade}>
                <label>
                    Symbol:
                    <select value={symbol} onChange={(e) => setSymbol(e.target.value)}>
                        {Object.keys(prices).map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                </label>
                <label>
                    Quantity:
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </label>
                <label>
                    Type:
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="BUY">Buy</option>
                        <option value="SELL">Sell</option>
                    </select>
                </label>
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default TradeForm;

