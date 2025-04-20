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
                // Đảm bảo phần tử hiển thị đầy đủ trong viewport
                const originalStyle = {
                    position: summaryRef.current.style.position,
                    left: summaryRef.current.style.left,
                    top: summaryRef.current.style.top,
                    width: summaryRef.current.style.width,
                    height: summaryRef.current.style.height,
                };
    
                // Lấy kích thước thực tế của phần tử
                const { width, height } = summaryRef.current.getBoundingClientRect();
    
                // Clone phần tử để thay đổi style
                const clonedElement = summaryRef.current.cloneNode(true) as HTMLElement;
                const subtitle = clonedElement.querySelector('.summary-subtitle') as HTMLElement;
                if (subtitle) {
                    subtitle.style.textDecoration = 'none';
                }
    
                // Đặt kích thước cố định cho clone
                clonedElement.style.width = `${width}px`;
                clonedElement.style.height = `${height}px`;
                clonedElement.style.position = 'absolute';
                clonedElement.style.left = '-9999px';
                document.body.appendChild(clonedElement);
    
                // Chụp ảnh với html2canvas, thêm scale để tăng chất lượng
                const canvas = await html2canvas(clonedElement, {
                    useCORS: true,
                    background: '#ffffff',
                    logging: true, // Bật log để debug trên di động
                });
    
                // Xóa bản sao khỏi DOM
                document.body.removeChild(clonedElement);
    
                // Tạo canvas mới với margin
                const margin = 20;
                const newCanvas = document.createElement('canvas');
                newCanvas.width = width * window.devicePixelRatio + margin * 2;
                newCanvas.height = height * window.devicePixelRatio + margin * 2;
    
                const ctx = newCanvas.getContext('2d');
                if (ctx) {
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(0, 0, newCanvas.width, newCanvas.height);
                    ctx.drawImage(canvas, margin, margin);
                }
    
                // Tạo hình ảnh và xử lý tải xuống
                const image = newCanvas.toDataURL('image/png');
    
                // Kiểm tra nếu thiết bị di động
                const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                if (isMobile) {
                    // Trên di động, mở hình ảnh trong tab mới để người dùng lưu thủ công
                    const win = window.open();
                    if (win) {
                        win.document.write(`<img src="${image}" />`);
                        win.document.title = 'Flight Summary - Long Press to Save Image';
                    } else {
                        alert('Please allow pop-ups to view and save the image.');
                    }
                } else {
                    // Trên desktop, sử dụng tải xuống bình thường
                    const link = document.createElement('a');
                    link.href = image;
                    link.download = 'flight-summary.png';
                    link.click();
                }
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