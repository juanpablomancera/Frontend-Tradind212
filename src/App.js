import React, { useEffect, useState, useCallback } from 'react';
import PriceTable from './components/PriceTable';
import TradeForm from './components/TradeForm';
import Balance from './components/Balance';
import TransactionHistory from './components/TransactionHistory';
import ResetButton from './components/ResetButton';
import Holdings from './components/Holdings';
import PnLTable from './components/PnLTable';
import {
    fetchBalance,
    fetchHoldings,
    fetchTransactions
} from './services/api';
import './App.css';

const USERNAME = 'testuser';

function App() {
    const [prices, setPrices] = useState({});
    const [balance, setBalance] = useState(0);
    const [holdings, setHoldings] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [lastUpdated, setLastUpdated] = useState(Date.now());

    const loadUserData = useCallback(() => {
        fetchBalance(USERNAME).then(setBalance);
        fetchHoldings(USERNAME).then(setHoldings);
        fetchTransactions(USERNAME).then(setTransactions);
        setLastUpdated(Date.now());
    }, []);

    useEffect(() => {
        loadUserData();
    }, [loadUserData]);

    useEffect(() => {
        const ws = new WebSocket('wss://ws.kraken.com');

        ws.onopen = () => {
            ws.send(
                JSON.stringify({
                    event: 'subscribe',
                    pair: [
                        'BTC/USD', 'ETH/USD', 'SOL/USD', 'ADA/USD', 'XRP/USD',
                        'DOT/USD', 'LTC/USD', 'LINK/USD', 'BCH/USD', 'XLM/USD',
                        'TRX/USD', 'AVAX/USD', 'UNI/USD', 'ATOM/USD', 'ETC/USD',
                        'NEAR/USD', 'MATIC/USD', 'FIL/USD', 'ALGO/USD', 'XTZ/USD'
                    ],
                    subscription: { name: 'ticker' }
                })
            );
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (Array.isArray(data) && data.length > 1) {
                    const [_, ticker] = data;
                    const pair = data[data.length - 1];
                    setPrices(prev => ({
                        ...prev,
                        [pair]: parseFloat(ticker.c[0]).toFixed(2)
                    }));
                }
            } catch (e) {}
        };

        return () => ws.close();
    }, []);

    return (
        <div className="app">
            <h1>Crypto Trading Simulator</h1>
            <Balance value={balance} />
            <ResetButton username={USERNAME} onReset={loadUserData} />
            <PriceTable prices={prices} />
            <TradeForm prices={prices} username={USERNAME} onTrade={loadUserData} />
            <Holdings data={holdings} />
            <TransactionHistory data={transactions} />
            <PnLTable username={USERNAME} lastUpdated={lastUpdated}/>
        </div>
    );
}

export default App;
