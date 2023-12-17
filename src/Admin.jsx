import React from 'react';
import './style/Login.css';

function Admin() {
    const handleContainerClick = (url) => {
        // Navigate to the specified URL when the container is clicked
        window.location.href = url;
    };

    return (
        <div className='admin-main'>
            <div className='admin-box-one'>
                <div className="admin-center-box">
                    <div className="admin-top"><p100>Admin</p100></div>

                    <div className="admin-information">
                        <div className="admin-info-box" onClick={() => handleContainerClick('/users-page')}>
                            <div className="admin-icon-box"></div>
                            <div className='admin-text-box'>Lietotāji</div>
                        </div>
                        <div className="admin-info-box" onClick={() => handleContainerClick('/new-user-page')}>
                            <div className="admin-icon-box2"></div>
                            <div className='admin-text-box'>Jauns lietotājs</div>
                        </div>
                        <div className="admin-info-box" onClick={() => handleContainerClick('/incoming-items-page')}>
                            <div className="admin-icon-box1"></div>
                            <div className='admin-text-box'>Ienākošās preces</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
