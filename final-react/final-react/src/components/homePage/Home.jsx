import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import Axios
import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import Axios
import Baner from '../Header/Header Com/Baner';
import { Row, Container, Col } from 'react-bootstrap';
import "../homePage/homePage.css/Home.css";

import "../homePage/homePage.css/Home.css";

const Home = () => {
    const [articles, setArticles] = useState([]);
    const [activeFeed, setActiveFeed] = useState('your'); 
    const [currentPage, setCurrentPage] = useState(1);
    const [articlesPerPage] = useState(10);
    const isLoggedIn = localStorage.getItem("currToken");

    const handleFeedToggle = (feedType) => {
        setActiveFeed(feedType);
    };

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('https://api.realworld.io/api/articles?limit=200');
                setArticles(response.data.articles);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticles();
    }, []); 

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
            {!isLoggedIn && <Baner />}
            <Container className='page'>
                <Row>
                    <Col md={9}>
                        <div className='flex'>
                            {isLoggedIn && (
                                <div
                                    className={`your ${activeFeed === 'your' ? 'active' : ''}`}
                                    onClick={() => handleFeedToggle('your')}
                                >
                                    Your Feed
                                </div>
                            )}
            {!isLoggedIn && <Baner />}
            <Container className='page'>
                <Row>
                    <Col md={9}>
                        <div className='flex'>
                            {isLoggedIn && (
                                <div
                                    className={`your ${activeFeed === 'your' ? 'active' : ''}`}
                                    onClick={() => handleFeedToggle('your')}
                                >
                                    Your Feed
                                </div>
                            )}
                            <div
                                className={`global ${activeFeed === 'global' ? 'active' : ''}`}
                                onClick={() => handleFeedToggle('global')}
                            >
                                Global Feed
                            </div>
                        </div>
                        
                        {activeFeed === 'your' && isLoggedIn && <div>Your Feed Content</div>}
                        {activeFeed === 'global' && (
                            <div>
                                {currentArticles.map(article => (
                                    <div key={article.slug}>
                                        <h2>{article.title}</h2>
                                        <p>{article.description}</p>
                                    </div>
                                ))}
                                {/* Pagination */}
                                <ul className="pagination">
                                    {Array.from({ length: Math.ceil(articles.length / articlesPerPage) }, (_, index) => (
                                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                            <button onClick={() => paginate(index + 1)} className="page-link">
                                                {index + 1}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </Col>

                    <Col md={3}>
                        Popular Tags
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Home;
