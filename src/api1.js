import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArticleComponent = ({ param }) => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/${param}`);
                setArticles(response.data.articles || []);
            } catch (error) {
                console.error('Error fetching data:', error);
                setArticles([]); // Set articles to an empty array in case of error
            }
        };

        fetchData();
    }, [param]);

    return (
        <div>
            {articles.length > 0 ? (
                articles.map((article, index) => (
                    <div key={index}>
                        <h3>Title: {article.title}</h3>
                        <p>Summary: {article.summary}</p>
                        <p>URL: <a href={article.url}>{article.url}</a></p>
                        <h4>Related Articles:</h4>
                        <ul>
                            {article.Related_articles.map((relatedArticle, i) => (
                                <li key={i}>
                                    <a href={relatedArticle.url}>{relatedArticle.title}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <p>No articles found.</p>
            )}
        </div>
    );
};

export default ArticleComponent;
