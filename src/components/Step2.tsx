import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { updateDate, selectDate } from '../slices/flightFormSlice';

interface Step2Props {
    onBack: () => void;
    onSubmit: () => void;
}

export const Step2 = ({ onBack, onSubmit }: Step2Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const date = useSelector<RootState, string>(selectDate);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <div className="form-div">
            <form onSubmit={handleSubmit}>
                <h2 className="form-subtitle">Step 2: Choose Date</h2>
                <div className="input-div">
                    <label>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => dispatch(updateDate(e.target.value))}
                        required
                    />
                </div>
                <button type="button" onClick={onBack}>Back</button>
                <button type="submit" style={{ marginLeft: "10px" }}>Book Flight</button>
            </form>
        </div>
    );
};