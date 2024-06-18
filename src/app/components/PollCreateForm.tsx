"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Form = () => {
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentTruth1, setCurrentTruth1] = useState("");
  const [currentTruth2, setCurrentTruth2] = useState("");
  const [currentLie, setCurrentLie] = useState("");
  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "title") setCurrentTitle(value);
    if (name === "truth1") setCurrentTruth1(value);
    if (name === "truth2") setCurrentTruth2(value);
    if (name === "lie") setCurrentLie(value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newFormData = {
      name: currentTitle,
      truth1: currentTruth1,
      truth2: currentTruth2,
      lie: currentLie,
    };

    router.push(`/firstFrame?data=${encodeURI(JSON.stringify(newFormData))}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
        margin: "0 auto",
        padding: "1rem",
      }}
    >
      <input
        type="text"
        name="title"
        value={currentTitle}
        onChange={handleChange}
        placeholder="Enter name"
      />
      <input
        type="text"
        name="truth1"
        value={currentTruth1}
        onChange={handleChange}
        placeholder="Enter first truth"
      />
      <input
        type="text"
        name="truth2"
        value={currentTruth2}
        onChange={handleChange}
        placeholder="Enter second truth"
      />
      <input
        type="text"
        name="lie"
        value={currentLie}
        onChange={handleChange}
        placeholder="Enter a lie"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
