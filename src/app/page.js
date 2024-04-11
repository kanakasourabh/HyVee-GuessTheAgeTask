"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // api for age
      const ageResponse = await axios.get(`https://api.agify.io?name=${name}`);
      console.log(ageResponse);
      setAge(ageResponse.data.age);

      // api for gender
      const genderResponse = await axios.get(
        `https://api.genderize.io?name=${name}`
      );
      console.log(genderResponse);
      setGender(genderResponse.data.gender);

      // api for country
      const countryResponse = await axios.get(
        `https://api.nationalize.io?name=${name}`
      );
      console.log(countryResponse);
      const countries = countryResponse.data.country.map((c) => c.country_id);
      setCountry(countries.join(", "));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Name Guessing App</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a name..."
            className="input"
          />
        </label>
        <button type="submit" className="button" disabled={isLoading}>
          {isLoading ? "Guessing..." : "Guess"}
        </button>
      </form>
      <div className="result-container">
        {isLoading ? (
          <div className="loading">
            <p className="loading-text">Fetching data...</p>
          </div>
        ) : (
          <>
            {age && (
              <div className="result-item">
                <h3 className="result-label">Age</h3>
                <p className="result-value">{age}</p>
              </div>
            )}
            {gender && (
              <div className="result-item">
                <h3 className="result-label">Gender</h3>
                <p className="result-value">{gender}</p>
              </div>
            )}
            {country && (
              <div className="result-item">
                <h3 className="result-label">Country</h3>
                <p className="result-value">{country}</p>
              </div>
            )}
          </>
        )}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
        .title {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        .input {
          padding: 0.5rem;
          margin-bottom: 1rem;
          font-size: 1rem;
          width: 300px;
        }
        .button {
          padding: 0.5rem 1rem;
          font-size: 1rem;
          background-color: #007bff;
          color: #fff;
          border: none;
          cursor: pointer;
        }
        .button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        .loading {
          font-style: italic;
          color: #888;
        }
        .result-container {
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .loading-text {
          margin-top: 0.5rem;
          font-style: italic;
          color: #888;
        }

        .result-item {
          background-color: #f5f5f5;
          padding: 1rem;
          border-radius: 4px;
          margin-bottom: 1rem;
          width: 100%;
          max-width: 300px;
          text-align: center;
        }

        .result-label {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
        }

        .result-value {
          font-size: 1.5rem;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
