const API = 'http://localhost:8080/api';

export const fetchBalance = async (username) => {
    const res = await fetch(`${API}/balance/${username}`);
    return res.json();
};

export const fetchHoldings = async (username) => {
    const res = await fetch(`${API}/holdings/${username}`);
    return res.json();
};

export const fetchTransactions = async (username) => {
    const res = await fetch(`${API}/transactions/${username}`);
    return res.json();
};

export const resetAccount = async (username) => {
    await fetch(`${API}/reset/${username}`, { method: 'POST' });
};

export const tradeCrypto = async (data, type) => {
    const res = await fetch(`${API}/${type.toLowerCase()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Trade failed');
    }

    return res.text();
};