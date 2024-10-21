import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "./firebase"; // Import the Firestore config from the firebase.js file

const RealTimeEditor = () => {
  const [docContent, setDocContent] = useState("");
  const [loading, setLoading] = useState(true);
  const documentId = "sharedDoc"; // Document ID for the shared document in Firestore
  const navigate = useNavigate();

  useEffect(() => {
    const docRef = doc(db, "documents", documentId);

    // Listen for real-time updates from Firestore
    const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setDocContent(docSnapshot.data().content);
      } else {
        console.log("Document does not exist. Creating a new one...");
        setDoc(docRef, { content: "" });
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Unsubscribe when the component unmounts
  }, [documentId]);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const updateDocument = async (updatedContent) => {
    const docRef = doc(db, "documents", documentId);
    try {
      await setDoc(docRef, { content: updatedContent }, { merge: true });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  // Updated this function to directly receive the event parameter
  const handleContentChange = useCallback(debounce((event) => {
    const updatedContent = event.target.value;
    setDocContent(updatedContent);
    updateDocument(updatedContent);
  }, 500), []); // 500ms delay for debouncing

  const goToEditPage = () => {
    navigate('/save');
  };

  const downloadDocument = () => {
    const blob = new Blob([docContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.txt'; // Set the default file name
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Clean up the URL object
  };

  return (
    <div style={styles.container}>
      <h2>Real-Time Collaborative Editor</h2>
      <textarea
       
        onChange={handleContentChange} 
        style={styles.editor}
        placeholder="Start writing your document here..."
      />
      <div style={styles.displayBox}>
        <h3>Current Content:</h3>
        <p>{docContent}</p>
      </div>
      <div className="button-container">
        <button onClick={downloadDocument} className="btn save-btn">
          Save to Computer
        </button>
        <button onClick={goToEditPage} className="btn edit-btn">
          Save to Cloud
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "50px",
  },
  editor: {
    width: "80%",
    height: "300px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontFamily: "monospace",
    boxSizing: "border-box",
    marginBottom: "20px", // Add some space between the editor and display box
  },
  displayBox: {
    width: "80%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontFamily: "monospace",
    backgroundColor: "#f9f9f9",
    marginBottom: "20px", // Add some space below the display box
  },
};

export default RealTimeEditor;
