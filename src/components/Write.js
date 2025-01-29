import React, { useState } from "react";
import app from "../firebase";
import { getDatabase, ref, set, push, update } from "firebase/database";
import { Button, Form, Col, Row } from "react-bootstrap";

function Write({ dbSnapshot, scores, setScores, refreshData}) {
  let [name, setName] = useState("");
  let [score, setScore] = useState("");

  const saveData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "pinballscores/");

    try {
      let existingEntryKey = null;
      let existingScore = null;

      // 🔹 Use dbSnapshot to find the actual Firebase key for the name
      if (dbSnapshot.exists()) {
        const data = dbSnapshot.val();
        for (const key in data) {
          if (data[key].Name.toLowerCase() === name.toLowerCase()) {
            existingEntryKey = key;
            existingScore = parseInt(data[key].Score);
            break;
          }
        }
      }

      if (existingEntryKey) {
        // Name exists, prompt for update
        const userResponse = prompt(
          "This name already exists. Enter 'yes' to update the score."
        );

        if (userResponse && userResponse.toLowerCase() === "yes") {
          const newScore = parseInt(score);

          if (newScore > existingScore) {
            // 🔹 Update the score in Firebase using the correct key
            const existingEntryRef = ref(db, `pinballscores/${existingEntryKey}`);
            await update(existingEntryRef, { Score: newScore });

            // 🔹 Update local scores without another database read
            const updatedScores = scores.map((entry) =>
              entry.Name.toLowerCase() === name.toLowerCase()
                ? { ...entry, Score: newScore }
                : entry
            );
            updatedScores.sort((a, b) => b.Score - a.Score);
            setScores(updatedScores);

            alert("Score updated successfully!");
            refreshData();
          } else {
            alert("Previous score is higher. No update made.");
          }
        }
      } else {
        // 🔹 Add new entry to Firebase
        const newDocRef = push(dbRef);
        await set(newDocRef, { Name: name, Score: parseInt(score) });

        // 🔹 Update local state immediately to reflect the change
        const updatedScores = [...scores, { Name: name, Score: parseInt(score) }];
        updatedScores.sort((a, b) => b.Score - a.Score);
        setScores(updatedScores);

        alert("Score Uploaded");
        refreshData();
      }
    } catch (error) {
      alert("Error uploading score: " + error.message);
    }
  };

  return (
    <div>
      <Form>
        <h3>Enter New Score</h3>
        <Row className="mb-3">
          <Col>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name..."
            />
          </Col>
          <Col>
            <Form.Control
              value={score}
              onChange={(e) => setScore(e.target.value)}
              placeholder="Score"
            />
          </Col>
        </Row>
        <Row>
          <Button variant="primary" size="lg" onClick={saveData}>
            Add Score
          </Button>
        </Row>
      </Form>
    </div>
  );
}

export default Write;
