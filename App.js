import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import Logo from "./Logo"; // Import the Logo component

const languages = [
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "te", label: "Telugu" }, 
];
const textColors = ["#FF5733", "#33FF57", "#5733FF", "#FF33A8", "#33FFF5"];

function Translate() {
    const [text, setText] = useState("");
    const [translatedText, setTranslatedText] = useState("");
    const [sourceLang, setSourceLang] = useState(languages[0]);
    const [targetLang, setTargetLang] = useState(languages[4]); // Default target: Telugu
    const [textColor, setTextColor] = useState(textColors[0]); // Default color

    const handleTranslate = async () => {
        if (!text.trim()) {
            alert("Please enter text to translate.");
            return;
        }

        try {
            const response = await axios.get("https://api.mymemory.translated.net/get", {
                params: {
                    q: text,
                    langpair: `${sourceLang.value}|${targetLang.value}`,
                },
            });

            let translatedOutput = response.data.responseData.translatedText;

            // Fix common translation errors (Remove "IAM" if it appears)
            translatedOutput = translatedOutput.replace(/\bIAM\b/g, "").trim();

            setTranslatedText(translatedOutput);
            setTextColor(textColors[Math.floor(Math.random() * textColors.length)]); // Random color for each translation
        } catch (error) {
            console.error("Translation error:", error);
            setTranslatedText("Translation failed. Try again.");
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <Logo /> {/* Display the Logo at the top */}
            
            <h2 style={{ color: "#333" }}>🌍 Text Translation Tool</h2>
            <textarea
                rows="4"
                cols="50"
                placeholder="Enter text..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{ padding: "10px", fontSize: "16px", borderRadius: "8px", border: "1px solid #ccc" }}
            />
            <div style={{ marginTop: "10px", display: "flex", justifyContent: "center", gap: "10px" }}>
                <Select options={languages} value={sourceLang} onChange={setSourceLang} />
                <Select options={languages} value={targetLang} onChange={setTargetLang} />
            </div>
            <button
                onClick={handleTranslate}
                style={{
                    marginTop: "10px",
                    padding: "10px 20px",
                    fontSize: "16px",
                    backgroundColor: "#007BFF",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Translate
            </button>
            <h3 style={{ marginTop: "20px", color: "#555" }}>Translated Text:</h3>
            <p style={{ fontWeight: "bold", fontSize: "22px", color: textColor }}>{translatedText}</p>
        </div>
    );
}

export default Translate;
