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
                // Lấy kích thước thực tế của summary-div
                const { width, height } = summaryRef.current.getBoundingClientRect();
                const scale = 1.5;
    
                // Clone phần tử để thay đổi style
                const clonedElement = summaryRef.current.cloneNode(true) as HTMLElement;
                const subtitle = clonedElement.querySelector('.summary-subtitle') as HTMLElement;
                if (subtitle) {
                    subtitle.style.textDecoration = 'none';
                    clonedElement.style.width = `${width}px`;
                    clonedElement.style.height = `${height}px`;
                }
    
                // Ẩn bản sao trên trang
                clonedElement.style.position = 'absolute';
                clonedElement.style.left = '-9999px';
                document.body.appendChild(clonedElement);
    
                // Chụp ảnh bản sao với kích thước điều chỉnh để chứa viền
                const canvas = await html2canvas(clonedElement, {
                    useCORS: true,
                    background: '#ffffff',
                });
    
                // Xóa bản sao khỏi DOM
                document.body.removeChild(clonedElement);
    
                // Tạo canvas mới với kích thước lớn hơn để thêm margin
                const margin = 20;
                const newCanvas = document.createElement('canvas');
                newCanvas.width = width * scale + margin * 2;
                newCanvas.height = height * scale + margin * 2;
    
                const ctx = newCanvas.getContext('2d');
                if (ctx) {
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(0, 0, newCanvas.width, newCanvas.height);
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