import React from 'react';
import recog from '../../assets/images/employeerecognition.jpeg';
import knowledge from '../../assets/images/knowledgebase.png';
import aviontepw from '../../assets/images/avionteportal.png';

export default function Home() {
    const cards = [
        {
            title: "Employee Recognition",
            img: recog,
            link: "https://forms.office.com/Pages/ResponsePage.aspx?id=fQnPFIfGeEKcQT8jENJj3XDPGqz5BK5MsYHcQWFwJvVUMTU4MjlLODBXRVJaSVlNV09RSTlPUFFBQy4u&wdLOR=c1F98ACEF-C29E-49CF-B342-2A183D0557DC"
        },
        {
            title: "Knowledge Base",
            img: knowledge,
            link: "https://yesyouremploymentsolutions.sharepoint.com/:f:/g/Eog795bJEQBOgZCgjk6efXUBbjBayAmK_c40wCK8KHysog?e=gfEKay"
        },
        {
            title: "Reset Avionte Core Password",
            img: aviontepw,
            link: "https://login.aviontego.com"
        }
    ]

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12 bg-color-lightgray">
                    <h2>YES Resources</h2>
                    <div className="row">
                        {cards.map((card) => (
                            <a href={card.link} className='card col-md-3 m-3 linkcards linktext' key={card.title} target="_blank">
                                <img src={card.img} alt={card.title} className="imageborder" />
                                <div className="card-body">
                                    <h5 className="card-title">{card.title}</h5>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}