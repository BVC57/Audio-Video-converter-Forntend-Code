import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import "./App.css";
import FileUploader from "./Componets/Upload";;

function App() {
  const [historyData, setHistoryData] = useState([]); // State to store history data
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

  // Event handler for fetching history data
  const handleShowHistory = () => {
    axios.get('http://localhost:5000/get_data') // Assuming your Flask API endpoint is served from the same origin
      .then(response => {
        setHistoryData(response.data); // Set history data in state
        setShowPopup(true); // Show popup
      })
      .catch(error => {
        console.error('Error fetching history data:', error);
      });
  };

  return (
    <div className="App">
      

      <div className="uploadsec" style={{ display: showPopup ? 'none' : 'block' }}>
      <div className="sowhis">
        <button onClick={handleShowHistory}>Show History</button>
      </div>
        <h1>Upload A File</h1>
        <FileUploader />
      </div>

      <div className="hispopup" style={{ display: showPopup ? 'block' : 'none' }}>
        {/* Popup/modal component */}
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <button onClick={() => setShowPopup(false)}>Close</button>
              <h2>All Time History</h2>
              <table>
                <thead>
                  <tr>
                    <th>Filename</th>
                    <th>Filetype</th>
                    <th>Date/Time</th>
                    <th>Processing Status</th>
                    <th>Convert Language</th>
                    <th>Cancle Request</th>
                  </tr>
                </thead>
                <tbody>
                  {historyData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.filename}</td>
                      <td>{item.filetype}</td>
                      <td>{item.dateandtime}</td>
                      <td>{item.status}</td>
                      <td>{item.convertlanguage}</td>
                      <td><button>Cancle</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
