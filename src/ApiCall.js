import React, { useState } from 'react';
import axios from 'axios';
import { PacmanLoader } from 'react-spinners';
import "./App.css"

function ArticleSearch() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasResponse, setHasResponse] = useState(false);

  const searchArticles = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://flask-on-koyeb-sucker3699.koyeb.app/api/${query}`);
      setSearchResults(response.data.articles);
      setErrorMessage('');
      setHasResponse(true);
    } catch (error) {
      setErrorMessage('Failed to fetch search results.');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchArticles(query);
  };

  return (
    <div className="article-search">
      {!hasResponse && (
        <>
          <h1 className="text-center pt-40 text-5xl pb-5">Swift Sum</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-center">
              <input
                className="border border-black rounded-xl"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter search query"
              />
              <button className="mx-5 border border-black rounded-lg text-white bg-black" type="submit">
                Search
              </button>
            </div>
          </form>
          <div className="flex items-center justify-center">
          </div>
        </>
      )}
      <div className=" mt-5 mr-10 h-screen flex justify-center">{loading && <PacmanLoader />}</div>
      {errorMessage && <p>{errorMessage}</p>}
      {!loading && hasResponse && (
        <div className="search-results">
          <h1 className='ml-3 mb-5 text-5xl'>Results :</h1>
          {searchResults.map((article, index) => (
            <div key={index} className="article">
              <h2 className="px-5 text-3xl">
                <a href={article.url} target="_blank" >{article.title}</a>
              </h2>
              <p className="px-5 py-5">Summary:</p>
              <p className="ml-20 pb-5">{article.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ArticleSearch;
