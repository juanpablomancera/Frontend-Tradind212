import React from 'react';
import { resetAccount } from '../services/api';

function ResetButton({ username, onReset }) {
    const handleReset = async () => {
        await resetAccount(username);
        onReset();
    };

    return <button onClick={handleReset}>Reset Account</button>;
}

export default ResetButton;