// src/App.js
import React, { Fragment, useState } from "react";
import { fetchNationalizeData } from "../api/api";

const Home = () => {
  const [names, setNames] = useState("");
  const [results, setResults] = useState([]);
  const [validError, setValidError] = useState(false);

  const handleSearch = async () => {
    if (names) {
      setValidError(false);
      try {
        const data = await fetchNationalizeData(names);
        setResults(data);
      } catch (error) {
        console.error("Error while fetching Data", error);
      }
    } else {
      setValidError(true);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <h1 className="text-center my-4">Check Your Name Probability</h1>
          <p className="text-center">
            You have the flexibility to search using either a single name or
            multiple names, separated by commas (e.g., name1, name2,...so on).
          </p>
          <div className="col-md-4 d-block m-auto ">
            <input
              className="w-100"
              type="text"
              value={names}
              onChange={(e) => setNames(e.target.value)}
              required
            />
            <span className="text-danger">
              {validError ? "please fill the input" : ""}
            </span>
            <button
              className="btn btn-success d-block m-auto my-4"
              type="button"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
        <div className="row">
          {results.length > 0 &&
            results.map((ele) => {
              if (ele.country.length > 0) {
                return ele.country.map((country) => {
                  return (
                    <Fragment key={country.country_id}>
                      <div className="col-md-4">
                        <div class="card">
                          <div class="card-body">
                            <h5 class="card-title">{ele.name}</h5>
                            <p class="card-text">
                              Country Code:{country.country_id}
                            </p>
                            <p class="card-text">
                              The Probability of the searched name in the
                              country{" "}
                              <span className="text-success fw-bold">
                                {country.country_id}
                              </span>{" "}
                              is{" "}
                              <span>
                                {Math.round(country.probability * 100)}%
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  );
                });
              }
            })}
        </div>
      </div>
    </>
  );
};

export default Home;
