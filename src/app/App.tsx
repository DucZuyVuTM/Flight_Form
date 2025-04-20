import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { selectDeparture, selectDestination, selectDate } from '../slices/flightFormSlice';
import { Step1 } from '../components/Step1';
import { Step2 } from '../components/Step2';

export const App = () => {
    const [step, setStep] = useState(1);

    const departure = useSelector<RootState, string>(selectDeparture);
    const destination = useSelector<RootState, string>(selectDestination);
    const date = useSelector<RootState, string>(selectDate);

    return (
        <div>
            <h1>Flight Booking Form</h1>
            {step === 1 ? (
                <Step1 onNext={() => setStep(2)} />
            ) : (
                <Step2 onBack={() => setStep(1)} />
            )}
            <div>
                <h3>Summary:</h3>
                <p>Departure: {departure}</p>
                <p>Destination: {destination}</p>
                <p>Date: {date}</p>
            </div>
        </div>
    );
};