import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import CryptoJS from 'crypto-js';
import { TextField, Button, IconButton, Tooltip } from '@mui/material';
import { FaCopy, FaExchangeAlt } from 'react-icons/fa';
import './Base64EncoderDecoder.css';

const Base64EncoderDecoder = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [passphrase, setPassphrase] = useState('');
    const [copySuccess, setCopySuccess] = useState('');
    const [mode, setMode] = useState('Encoding');
    const [rotate, setRotate] = useState(false);

    const handleInputChange = (e) => {
        console.log("handleInputChange");
        const value = e.target.value;
        setInput(value);
        if (isBase64(value)) {
            setMode('Decoding');
        } else {
            setMode('Encoding');
        }
        handleConvert(value, passphrase);
    };

    const handlePassphraseChange = (e) => {
        console.log("handlePassphraseChange");
        const value = e.target.value;
        setPassphrase(value);
        handleConvert(input, value);
    };

    const handleConvert = (value, passphrase) => {
        console.log("handleConvert");
        if (isBase64(value) && mode === 'Decoding') {
            try {
                let decoded = atob(value); // Decode the base64 string
                if (passphrase) {
                    const bytes = CryptoJS.AES.decrypt(decoded, passphrase);
                    decoded = bytes.toString(CryptoJS.enc.Utf8);
                }
                setOutput(decoded);
            } catch (e) {
                setOutput('Invalid base64 string or incorrect passphrase');
            }
        } else {
            let encoded = btoa(unescape(encodeURIComponent(value))); // Encode the string in base64
            if (passphrase) {
                encoded = CryptoJS.AES.encrypt(value, passphrase).toString();
                encoded = btoa(unescape(encodeURIComponent(encoded))); // Encode the encrypted string in base64
            }
            setOutput(encoded);
        }
    };

    const isBase64 = (str) => {
        console.log("isBase64");
        try {
            return btoa(atob(str)) === str;
        } catch (err) {
            return false;
        }
    };

    const handleModeSwitch = () => {
        console.log("handleModeSwitch");
        const newMode = mode === 'Encoding' ? 'Decoding' : 'Encoding';
        setMode(newMode);
        handleConvert(input, passphrase);
    };

    const handleCopyToClipboard = () => {
        console.log("handleCopyToClipboard");
        navigator.clipboard.writeText(output).then(() => {
            setCopySuccess('Copied to clipboard!');
            setTimeout(() => setCopySuccess(''), 2000); // Clear the success message after 2 seconds
        }).catch(err => {
            setCopySuccess('Failed to copy!');
        });
    };

    const handleSwap = () => {
        console.log("handleSwap");
        setInput(output);
        setRotate(!rotate);  // Trigger the rotation animation
        handleModeSwitch();
        // handleConvert(output, passphrase);
    };

    const handleReset = () => {
        console.log("handleReset");
        setInput('');
        setOutput('');
        setPassphrase('');
        setCopySuccess('');
        setMode('Encoding');
    };

    const onDrop = useCallback((acceptedFiles) => {
        console.log("onDrop");
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = () => {
            const fileContent = reader.result;
            setInput(fileContent);
            if (isBase64(fileContent)) {
                setMode('Decoding');
            } else {
                setMode('Encoding');
            }
            handleConvert(fileContent, passphrase);
        };
        reader.readAsText(file);
    }, [passphrase]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div className="container">
            <h1>Base64 Encoder/Decoder</h1>
            <h3>with (Optional) Passphrase Encryption</h3>
            <TextField
                id='input'
                label="Input"
                multiline
                rows={10}
                fullWidth
                variant="outlined"
                value={input}
                onChange={handleInputChange}
                placeholder="Enter text or base64 encoded string"
                margin="normal"
                sx={{
                    '& .MuiInputBase-input': { color: 'white' },
                    '& .MuiInputLabel-root': { color: 'lightgray' },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'lightgray',
                        },
                        '&:hover fieldset': {
                            borderColor: 'white',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'white',
                        },
                    },
                }}
            />
            <div style={{ textAlign: "right" }}>
                <Button variant="outlined" color="warning" onClick={handleReset}>
                    Reset
                </Button>
            </div>
            <h3>OR</h3>
            <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                {isDragActive ? <p>Drop the file here ...</p> : <p>Drag 'n' drop a file here, or click to select a file</p>}
            </div>
            <div style={{ textAlign: "center" }}>
                <TextField
                    id='passphrase'
                    label="Passphrase (optional)"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={passphrase}
                    onChange={handlePassphraseChange}
                    margin="normal"
                    sx={{
                        '& .MuiInputBase-input': { color: 'white' },
                        '& .MuiInputLabel-root': { color: 'lightgray' },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'lightgray',
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white',
                            },
                        },
                    }}
                />
            </div>
            {input && (
                <Button variant="contained" color={mode === 'Encoding' ? 'success' : 'error'} onClick={handleModeSwitch}>
                    {mode}
                </Button>
            )}
            <div className="output-container">
                {output && (
                    <div className="output-header">
                        <Tooltip title="Copy">
                            <IconButton onClick={handleCopyToClipboard} style={{ color: 'white' }}>
                                <FaCopy />
                            </IconButton>
                        </Tooltip>
                    </div>
                )}
                <TextField
                    id='output'
                    label="Output"
                    multiline
                    rows={10}
                    fullWidth
                    variant="outlined"
                    value={output}
                    InputProps={{
                        readOnly: true,
                    }}
                    placeholder="Output will be displayed here"
                    margin="normal"
                    sx={{
                        '& .MuiInputBase-input': { color: 'white' },
                        '& .MuiInputLabel-root': { color: 'lightgray' },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'lightgray',
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white',
                            },
                        },
                    }}
                />
            </div>
            {output && (
                <div style={{ textAlign: "center" }} className="swap-icon">
                    <Tooltip title="Swap">
                        <IconButton
                            onClick={handleSwap}
                            style={{ color: 'white' }}
                            className={rotate ? 'rotate' : ''}
                        >
                            <FaExchangeAlt />
                        </IconButton>
                    </Tooltip>
                </div>
            )}
            {copySuccess && <div><h3 style={{ fontSize: "1.5em", color: "rgb(0, 255, 0)" }}><strong>{copySuccess}</strong></h3></div>}
        </div>
    );
};

export default Base64EncoderDecoder;