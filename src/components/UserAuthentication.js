import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function UserAuthentication() {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [defaultRotationAngle, setDefaultRotationAngle] = useState(0);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [codes, setCodes] = useState(['', '', '', '']);
  const [accessMessage, setAccessMessage] = useState('');
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (accessMessage === 'Access granted!') {
      const timer = setTimeout(() => {
        navigate('/home');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [accessMessage, navigate]);

  const handleCubeClick = () => {
    if (!showLoginForm) {
      setRotationAngle(180);
      setDefaultRotationAngle(180);
      setShowLoginForm(true);
      inputRefs.current[0].focus();
    }
  };

  const handleCodeChange = (e, index) => {
    const updatedCodes = [...codes];
    updatedCodes[index] = e.target.value;
    setCodes(updatedCodes);

    const nextIndex = index + 1;
    if (nextIndex < codes.length && e.target.value) {
      inputRefs.current[nextIndex].focus();
    }

    const enteredCode = updatedCodes.join('');
    if (enteredCode.length === 4) {
      if (enteredCode === '1234') {
        setAccessMessage('Access granted!');
        setRotationAngle(90);
      } else {
        setAccessMessage('Access denied!');
        setRotationAngle(-90);

        // Rotate back to default side after a delay
        setTimeout(() => {
          setRotationAngle(defaultRotationAngle);
        }, 1000);
      }
      setCodes(['', '', '', '']);
      inputRefs.current[0].focus();
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const enteredCode = codes.join('');
    if (enteredCode === '1234') {
      setAccessMessage('Access granted!');
      setRotationAngle(180);
      setDefaultRotationAngle(180);
    } else {
      setAccessMessage('Access denied!');
      setRotationAngle(0);
      setDefaultRotationAngle(0);
    }
    setCodes(['', '', '', '']);
    inputRefs.current[0].focus();
  };

  return (
    <div className="cube" onClick={handleCubeClick}>
      <div className={`side front ${showLoginForm ? 'hidden' : ''}`}>
        <button className="w-full h-full bg-gray-900 text-white text-lg rounded-md">
          ENTER SECURITY KEY
        </button>
      </div>
      <div className={`side back ${showLoginForm ? '' : 'hidden'}`}>
        <form onSubmit={handleLoginSubmit}>
          <div className="code-container">
            {codes.map((code, index) => (
              <input
                ref={(ref) => (inputRefs.current[index] = ref)}
                key={index}
                type="password"
                value={code}
                onChange={(e) => handleCodeChange(e, index)}
                maxLength={1}
                required
                className="w-16 h-16 text-4xl text-center bg-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>
          <button type="submit" className="hidden">
            ACCESS
          </button>
        </form>
      </div>
      <div
        className={`side left ${accessMessage ? 'access-message-side' : ''} bg-gray-200 p-4 flex items-center justify-center`}
      >
        {accessMessage === 'Access granted!' && (
          <div className="text-green-500 font-semibold text-center rounded-md">
            ACCESS GRANTED
            {/* <span className="ml-2 text-blue-500 underline">Redirecting...</span> */}
          </div>
        )}
      </div>
      <div
        className={`side right ${accessMessage ? 'access-message-side' : ''} bg-gray-200 p-4 flex items-center justify-center`}
      >
        {accessMessage && accessMessage === 'Access denied!' && (
          <div className="text-red-500 font-semibold text-center rounded-md">ACCESS DENIED!</div>
        )}
      </div>
      <div className={`side top ${accessMessage ? 'access-message-side' : ''}`}></div>
      <div className={`side bottom ${accessMessage ? 'access-message-side' : ''}`}></div>

      <style jsx>{`
        .cube {
          position: relative;
          width: 200px;
          height: 200px;
          transform-style: preserve-3d;
          transform: rotateY(${rotationAngle}deg);
          transition: transform 0.5s ease;
          cursor: pointer;
          background-color: black;
        }

        .side {
          position: absolute;
          width: 200px;
          height: 200px;
          background-color: rgba(0, 0, 0, 0.2);
          border: 1px solid black;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 20px;
          backface-visibility: hidden;
        }

        .front {
          transform: translateZ(100px);
        }

        .back {
          transform: rotateY(180deg) translateZ(100px);
        }

        .left {
          transform: rotateY(-90deg) translateZ(100px);
          background-color: black;
          color: red;
          font-weight: bold;
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .right {
          transform: rotateY(90deg) translateZ(100px);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .top {
          transform: rotateX(90deg) translateZ(100px);
        }

        .bottom {
          transform: rotateX(-90deg) translateZ(100px);
        }

        .hidden {
          display: none;
        }

        .code-container {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 5px;
          margin-bottom: 10px;
        }

        .code-container input {
          width: 40px;
          height: 40px;
          text-align: center;
          font-size: 16px;
          color: black;
        }

        .access-message-side {
          background-color: black;
          color: white;
          font-size: 24px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}

export default UserAuthentication;