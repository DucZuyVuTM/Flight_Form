import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { updateDeparture, updateDestination, selectDeparture, selectDestination } from '../slices/flightFormSlice';

interface Step1Props {
    onNext: () => void;
}

export const Step1 = ({ onNext }: Step1Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const departure = useSelector<RootState, string>(selectDeparture);
    const destination = useSelector<RootState, string>(selectDestination);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext(); // Chuyển sang bước 2
    };

    return (
        <div className="form-div">
            <form onSubmit={handleSubmit}>
                <h2 className="form-subtitle">Step 1: Choose Locations</h2>
                <div className="input-div">
                    <label>Departure:</label>
                    <input
                        type="text"
                        value={departure}
                        onChange={(e) => dispatch(updateDeparture(e.target.value))}
                        required
                    />
                </div>
                <div className="input-div">
                    <label>Destination:</label>
                    <input
                        type="text"
                        value={destination}
                        onChange={(e) => dispatch(updateDestination(e.target.value))}
                        required
                    />
                </div>
                <button type="submit">Next</button>
            </form>
        </div>
    );
};