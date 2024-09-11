import React, { useEffect, useState } from "react";
import "./AutoSearch.css";

const handelData = [
  {
    topic: "Apple",
    entries: [
      {
        title: "Apple - Nutrition facts",
      },
      {
        title: "Apple - facts -1",
      },
      {
        title: "Apple -  facts -2",
      },
      {
        title: "Apple - Nutrition -3",
      },
    ],
  },
];

const AutoSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedEntries, setSelectedEntries] = useState([]);
  const [selectedDetails, setSelectedDetails] = useState(null);

  const handleInputChanges = (e) => {
    const inputValue = e.target.value.trim();
    setQuery(inputValue);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (query) {
        const searchResults = performSearch(query);
        setResults(searchResults);
        // setSelectedEntries([]);
        // setSelectedDetails(null);
      } else {
        console.log("write query");
      }
    }, 300);

    return () => clearTimeout(timerId);
  }, [query]);

  const performSearch = (query) => {
    return handelData.filter((item) =>
      item.topic.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleTopicClick = (topic) => {
    const topicData = handelData.find((item) => item.topic === topic);
    setSelectedEntries(topicData.entries);
    setResults([]);
  };
  return (
    <>
      <div className="auto_container">
        <div className="search_part">
          <input
            type="text"
            placeholder="Enter What You Want"
            className="search_button"
            value={query}
            onChange={handleInputChanges}
          />
          {!selectedEntries.length && (
            <ul className="results_list">
              {results.map((result, index) => (
                <li
                  onClick={() => {
                    handleTopicClick(result.topic);
                  }}
                >
                  {result.topic}
                </li>
              ))}
            </ul>
          )}
          {selectedEntries.length > 0 && (
            <div className="link-list">
              {selectedEntries.map((entry, index) => (
                <div>
                  <a href="#">{entry.title}</a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AutoSearch;
