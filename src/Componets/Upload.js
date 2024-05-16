import React, { useState, useEffect } from 'react';
import './Upload.css';
import Select from "react-select";
import  axios from 'axios';

function App() {
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [fileType, setFileType] = useState('');
  const [progress, setProgress] = useState('');
  const [file, setFile] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null); // Changed to hold single language
  const [options, setOptions] = useState([]); // Changed to hold options for Select component

  const fileSelected = (event) => {
    const file = event.target.files[0];
    if (file) {
      let fileSizeStr;
      if (file.size > 1024 * 1024)
        fileSizeStr = `${(Math.round(file.size * 100 / (1024 * 1024)) / 100)}MB`;
      else
        fileSizeStr = `${(Math.round(file.size * 100 / 1024) / 100)}KB`;

      setFileName(`Name: ${file.name}`);
      setFileSize(`Size: ${fileSizeStr}`);
      setFileType(`Type: ${file.type}`);
    }
  };

  const uploadFile = () => {
    const fileInput = document.getElementById('fileToUpload');
    const file = fileInput.files[0];
    const fd = new FormData();
    fd.append("file",file);
    console.log(file);
    console.log(fd)
    console.log(selectedLanguage)
    const xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", uploadProgress, false);
    xhr.addEventListener("load", uploadComplete, false);
    xhr.addEventListener("error", uploadFailed, false);
    xhr.addEventListener("abort", uploadCanceled, false);
    xhr.open("POST", `http://localhost:5000/upload?lan=${selectedLanguage.value}`);
    xhr.send(fd);
  };

  const uploadProgress = (evt) => {
    if (evt.lengthComputable) {
      const percentComplete = Math.round(evt.loaded * 100 / evt.total);
      setProgress(`${percentComplete}%`);
    } else {
      setProgress('unable to compute');
    }
  };

  const uploadComplete = (evt) => {
    alert("FIle Upload Successfully");
    window.location.reload();
  };

  const uploadFailed = () => {
    alert("There was an error attempting to upload the file.");
  };

  const uploadCanceled = () => {
    alert("The upload has been canceled by the user or the browser dropped the connection.");
  };
  const customStyles = {
    // Example styles, you can customize them according to your needs
    control: (provided, state) => ({
      ...provided,
      border: "1px solid silver",
      width: "200px",
      marginleft: "20px",
      boxShadow: state.isFocused ? "none" : "none",
    }),
    menu: (provided) => ({
      ...provided,
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "#2684FF" : "black",
      background: state.isFocused ? "#f0f0f0" : "white",
    }),
    indicatorSeparator: () => ({}),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      transition: "transform 0.3s",
      transform: state.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
    }),
  };

  useEffect(() => {
    // Fetch languages from backend
    async function fetchLanguages() {
      try {
        const response = await axios.get('http://localhost:5000/languageslist');
        const data = response.data;

        // Format the data to match the format expected by the Select component
        const formattedOptions = data.map(language => ({
          value: language.code,
          label: language.name
        }));
        // Set the options for the Select component
        setOptions(formattedOptions);
        setSelectedLanguage(formattedOptions.value)

      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    }

    fetchLanguages();
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleLanguageChange = (selectedOption) => {
    setSelectedLanguage(selectedOption); // Set selected language
    console.log(selectedOption);
  };

  const handleUpload = async () => {
    // Handle file upload
  };

  return (
    <div>
      <form id="form1" encType="multipart/form-data">
        <div className="row">
          <input type="file" name="fileToUpload" id="fileToUpload" onChange={fileSelected} />
          <Select
        options={options}
        value={selectedLanguage} // Set selected value
        placeholder="Select Language"
        onChange={handleLanguageChange}
        styles={customStyles}
        className='sellan'
      />
        </div>
        <div id="fileName">{fileName}</div>
        <div id="fileSize">{fileSize}</div>
        <div id="fileSize">{fileType}</div>
        {/* <div id="progressNumber">{progress}</div> */}
        <div className="row1">
          <input type="button" onClick={uploadFile} value="Upload" />
        </div>
        
      </form>
    </div>
  );
}

export default App;
