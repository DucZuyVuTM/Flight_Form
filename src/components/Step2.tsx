import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { updateDate, selectDate } from '../slices/flightFormSlice';

interface Step2Props {
    onBack: () => void;
}

export const Step2 = ({ onBack }: Step2Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const date = useSelector<RootState, string>(selectDate);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Flight booked!');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Step 2: Choose Date</h2>
            <div>
                <label>Date:</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => dispatch(updateDate(e.target.value))}
                    required
                />
            </div>
            <button type="button" onClick={onBack}>Back</button>
            <button type="submit">Book</button>
        </form>
    );
};