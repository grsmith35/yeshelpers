import React, { useState } from 'react';
import image from '../../assets/images/yes-oval-white.png';
import { capitalizeFirstLetter } from '../../utils/helpers';
import { Link } from 'react-router-dom';

export default function Nav() {

    const pages = [
        "Home",
        "Resume Builder",
        "Payroll Converter"
    ];

    const [currentPage, setCurrentPage] = useState("Home")

    return(
        <div className="px-1 py-2 bg-dark text-white headerborder">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start row">
                    <a href="/Home" className="mr-1 col-md-2 align-self-start">
                        <img src={image} alt="YES Logo" />
                    </a>
                    <h1 className="d-flex align-items-center my-2 my-lg-0 text-white col-md-4 align-self-center">{currentPage}</h1>
                    <ul className="nav nav-pills nav-fill align-items-end col-md-5 align-self-end">
                        {pages.map((page) => (
                            <li key={page} className="nav-item">
                                <Link to={page} className="nav-link" aria-current="page" onClick={() => setCurrentPage(page)}>{page}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}