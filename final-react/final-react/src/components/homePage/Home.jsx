import React, { useState } from 'react';
import Baner from '../Header/Header Com/Baner';
import { Row, Container, Col } from 'react-bootstrap';
import "../homePage/homePage.css/Home.css"
const Home = () => {
    const [activeFeed, setActiveFeed] = useState('your'); // 'your' or 'global'

    const handleFeedToggle = (feedType) => {
        setActiveFeed(feedType);
    };
    return (
        <>
            <Baner />
            <div className='container page'>
                <div className='row'>
                    <div className='col-md-9'>
                        <div className=' flex'>
                            <div
                                className={`your ${activeFeed === 'your' ? 'active' : ''}`}
                                onClick={() => handleFeedToggle('your')}
                            >
                                Your Feed
                            </div>
                            <div
                                className={`global ${activeFeed === 'global' ? 'active' : ''}`}
                                onClick={() => handleFeedToggle('global')}
                            >
                                Global Feed
                            </div>
                        </div>
                        {/* Display content based on activeFeed */}
                        {activeFeed === 'your' && <div>Your Feed Content</div>}
                        {activeFeed === 'global' && <div>Global Feed Content</div>}
                    </div>

                    <div className='col-md-3'>Popular Tags</div>
                </div>
            </div>
        </>
    );
};

export default Home;