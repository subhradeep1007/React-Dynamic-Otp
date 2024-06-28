import logo from './logo.svg';
import DynamicOtp from './Components/DynamicOtp/index.tsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DynamicOtp numberOfDigits={4} onOtpChange={(otp)=>console.log('otp',otp)} isResendOtpClicked={false} />
      </header>
    </div>
  );
}

export default App;
