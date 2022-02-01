import React from 'react';
import image from '../../assets/images/YES-Awards-Logo.png';

export default function Footer() {
    return(
        <footer className="bg-color-footer footerborder">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <a href="youremploymentsolutions.com">
                            <img src={image} alt="YES 20 years in business image" />
                        </a>
                    </div>
                    <div className="col-md-6">
                        <h4>Check out more about Your Employment Solutions</h4>
                        <ul className="list-unstyled text-muted">
                            <li className="mb-2">
                                <a className="link-font" href="https://youremploymentsolutions.com" target="_blank">YES Website</a>
                            </li>
                            <li className="mb-2">
                                <a className="link-font" href="https://yss.avionte.com/yes-job-board" target="_blank">YES Job Board</a>
                            </li>
                            <li className="mb-2">
                                <a className="link-font" href="https://www.youtube.com/c/YourEmploymentSolutionsYES" target="_blank">YES Youtube</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}