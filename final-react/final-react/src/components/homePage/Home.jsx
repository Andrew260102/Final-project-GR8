import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import Axios
import Baner from '../Header/Header Com/Baner';
import { Row, Container, Col } from 'react-bootstrap';
import "../homePage/homePage.css/Home.css";
import { NavLink } from 'react-router-dom';


const Home = () => {
    const [articles, setArticles] = useState([]);
    const [activeFeed, setActiveFeed] = useState('your'); // 'your' or 'global'
    const [currentPage, setCurrentPage] = useState(1);
    const [articlesPerPage] = useState(10);
    const isLoggedIn = localStorage.getItem("currToken");

    const handleFeedToggle = (feedType) => {
        setActiveFeed(feedType);
    };

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                // Use Axios for the API request
                const response = await axios.get('https://api.realworld.io/api/articles?limit=200');
                setArticles(response.data.articles);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticles();
    }, []);

    // Get current articles
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    // Change page
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
                            <div
                                className={`global ${activeFeed === 'global' ? 'active' : ''}`}
                                onClick={() => handleFeedToggle('global')}
                            >
                                Global Feed
                            </div>
                        </div>

                        {/* Display content based on activeFeed */}
                        {activeFeed === 'your' && isLoggedIn && <div>Your Feed Content</div>}
                        {activeFeed === 'global' && (
                            <div>
                                {currentArticles.map(article => (
                                    <div key={article.slug}>
                                        <Row className='article-preview'>
                                            <Col xs="6" className='flex'>
                                                <a href={'/@' + article.author.username} className='size-img'>
                                                    <img src={article.author.image} alt="" />
                                                </a>
                                                <div className='user-detail'>
                                                    <a href={'/@' + article.author.username} className='size-img'>
                                                        {article.author.username}
                                                    </a>
                                                    <p>{new Date(article.createdAt).toLocaleDateString("en-US", {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}</p>
                                                </div>
                                            </Col>
                                            <Col xs="6">
                                                <div>
                                                    <button className="btn btn-sm btn-outline-primary buright flex">
                                                        <i className="bi bi-heart-fill"></i>{article.favoritesCount}
                                                    </button>
                                                </div>
                                            </Col>

                                        </Row>
                                        <h1 className='font-title' >{article.title}</h1>
                                        <p className='font-desc'>{article.description}</p>
                                        <div>
                                            <span>Read more...</span>
                                            <ul className="tag-list">
                                                {article.tagList.map((tag) => (
                                                    <li key={tag} className="tag-default tag-pill tag-outline">
                                                        {tag}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

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
