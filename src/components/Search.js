import React, { useState, useEffect } from "react";
import axios from "axios";

export const Search = () => {
  const [searchInput, setSearchInput] = useState("programming");
  const [debouncedTerm, setDebouncedTerm] = useState(searchInput);
  const [results, setResults] = useState([]);
  useEffect(() => {
    const timerID = setTimeout(() => {
      setDebouncedTerm(searchInput);
    }, 1000);
    return () => {
      clearTimeout(timerID);
    };
  }, [searchInput]);
  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: debouncedTerm,
        },
      });
      setResults(data.query.search);
    };
    search();
  }, [debouncedTerm]);

  const renderedResult = results.map((result) => {
    return (
      <div
        className="card d-flex flex-row align-items-center"
        key={result.pageid}
      >
        <div className="card-body">
          <div className="card-title">{result.title}</div>
          <div className="card-text">
            <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
          </div>
        </div>
        <div className="mr-2">
          <a
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
            className="btn btn-info"
          >
            Go
          </a>
        </div>
      </div>
    );
  });
  return (
    <div>
      <form>
        <div className="form-group">
          <label>Enter Search Term</label>
          <input
            className="form-control"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </form>
      {renderedResult}
    </div>
  );
};
