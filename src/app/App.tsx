import { useState , useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { selectDeparture, selectDestination, selectDate } from '../slices/flightFormSlice';
import { Step1 } from '../components/Step1';
import { Step2 } from '../components/Step2';
import html2canvas from 'html2canvas';

export const App = () => {
    const [step, setStep] = useState(1);
    const summaryRef = useRef<HTMLDivElement>(null);

    const departure = useSelector<RootState, string>(selectDeparture);
    const destination = useSelector<RootState, string>(selectDestination);
    const date = useSelector<RootState, string>(selectDate);

    const captureSummary = async () => {
        if (summaryRef.current) {
            try {
                const canvas = await html2canvas(summaryRef.current, {
                    useCORS: true,
                    background: '#ffffff',
                });
    
                // Tạo một canvas mới với kích thước lớn hơn
                const margin = 20; // Khoảng cách margin muốn thêm (pixel)
                const newCanvas = document.createElement('canvas');
                newCanvas.width = canvas.width + margin * 2; // Thêm margin hai bên
                newCanvas.height = canvas.height + margin * 2; // Thêm margin trên dưới
    
                const ctx = newCanvas.getContext('2d');
                if (ctx) {
                    // Đặt nền trắng cho canvas mới
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(0, 0, newCanvas.width, newCanvas.height);
    
                    // Vẽ canvas cũ vào giữa canvas mới
                    ctx.drawImage(canvas, margin, margin);
                }
    
                // Tạo link tải xuống
                const image = newCanvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = image;
                link.download = 'flight-summary.png';
                link.click();
            } catch (error) {
                console.error('Error capturing screenshot:', error);
                alert('Failed to capture screenshot. Please try again.');
            }
        }
    };

    const handleFormSubmit = () => {
        alert(
            `Flight booked!\nDeparture: ${departure}\nDestination: ${destination}\nDate: ${date}`
        );
        captureSummary();
    };

    return (
        <div className="form-container">
            <h1 className="form-title">Flight Booking Form</h1>
            {step === 1 ? (
                <Step1 onNext={() => setStep(2)} />
            ) : (
                <Step2 onBack={() => setStep(1)} onSubmit={handleFormSubmit} />
            )}
            <div className="summary-div" ref={summaryRef}>
                <h3 className="summary-subtitle">Summary</h3>
                <p className="summary-info">Departure: {departure}</p>
                <p className="summary-info">Destination: {destination}</p>
                <p className="summary-info">Date: {date}</p>
            </div>
        </div>
    );
};