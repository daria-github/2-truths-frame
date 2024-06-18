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
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-white">Your Name</label>
        <div className="mt-1">
          <input
            className="block w-full rounded-md border-0 bg-white/5 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            type="text"
            name="title"
            value={currentTitle}
            onChange={handleChange}
            placeholder="Satoshi Nakamoto"
          />
        </div>
      </div>
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-white">First Truth</label>
        <div className="mt-1">
          <input
            className="block w-full rounded-md border-0 bg-white/5 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            type="text"
            name="truth1"
            value={currentTruth1}
            onChange={handleChange}
            placeholder="I have a pet turtle."
          />
        </div>
      </div>
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-white">Second Truth</label>
        <div className="mt-1">
          <input
            className="block w-full rounded-md border-0 bg-white/5 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            type="text"
            name="truth2"
            value={currentTruth2}
            onChange={handleChange}
            placeholder="I once ate a whole pizza by myself in 5 minutes."
          />
        </div>
      </div>
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-white">The Lie</label>
        <div className="mt-1">
          <input
            className="block w-full rounded-md border-0 bg-white/5 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            type="text"
            name="lie"
            value={currentLie}
            onChange={handleChange}
            placeholder="I have never tried coffee."
          />
        </div>
      </div>
      <button className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-3 mt-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" type="submit">Submit</button>
    </form>
  );
};

export default Form;
