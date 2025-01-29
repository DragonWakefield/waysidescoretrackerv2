import React, { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import Write from "./components/Write";
import Read from "./components/Read";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image, Container } from "react-bootstrap";


function App() {
  const [dbSnapshot, setSnapshot] = useState([])
  const [scores, setScores] = useState([]);

  // Fetch scores from Firebase
  const fetchData = async () => {
    const db = getDatabase();
    const dbRef = ref(db, "pinballscores/");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      setSnapshot(snapshot);
      const data = Object.values(snapshot.val());
      data.sort((a, b) => b.Score - a.Score);
      setScores(data);
    } else {
      console.log("No data available");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshData = () => {
    fetchData(); // Call fetchData again to update dbSnapshot & scores
  };

  return (
    <div className="App text-white" style={
      {backgroundColor:"black",
        fontFamily:"Jersey 10, serif",
        backgroundImage: "url('/download.gif')", // Reference the GIF in the public folder
        backgroundSize: "cover", // Ensure the image covers the entire background
        backgroundPosition: "center", // Center the image
        backgroundRepeat: "no-repeat", // Avoid repeating the GIF
      }
    }>
      <Container className="d-flex flex-column align-items-center justify-content-center text-center" 
        style={{minHeight: "100vh",
          width: "33vw", 
          maxWidth: "600px", 
          minWidth: "300px",
          margin: "0 auto", 
          backgroundColor: "rgba(0, 0, 0, 0.9)", 
          borderRadius: "10px", 
          padding: "2rem",
        }}>
        <Container className="mb-7">
          <Image src="/waysideship.png" alt="Pixel Art" fluid />
          <h1>Wayside High Scores</h1>
        </Container>
        <br/>
        <Container
          fluid className="p-0"
        >
          <Read scores={scores}/>
          <br />
          <Write dbSnapshot={dbSnapshot} scores={scores} setScores={setScores} refreshData={refreshData}/>
      </Container>
    </Container>
    </div>
  );
}

export default App;
