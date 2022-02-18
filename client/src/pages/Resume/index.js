import React, { useEffect, useState } from 'react';
import Personal from '../../components/Personal';
import Currentjob from '../../components/Currentjob';
import Education from '../../components/Education';
import Jobhistory from '../../components/Jobhistory';
import Skills from '../../components/Skills';
import uniqid from 'uniqid';
import { createResume } from '../../utils/helpers';

export default function Resume() {

    const [showCurrent, setShowCurrent] = useState(true);
    const [personalInfo, setPersonalInfo] = useState({ fullname: "", address: "", email: "", number: "", city: "", state: "", zip: "" });
    const [currentJob, setCurrentJob] = useState({ company: "", title: "", description: "", startdate: ""});
    const [pastJobs, setPastJobs] = useState([]);
    const [myEducation, setMyEducation] = useState([])
    const [mySkills, setMySkills] = useState([])
    let theFinal = [];

    function handleShowBox() {
        setShowCurrent(!showCurrent);
    }

    useEffect(() => {
        let theId = uniqid();
        setPastJobs(pastJobs => [{id: theId, title: "anything", company: "a company", description: "did work", startdate: "11/12/2020", enddate: "11/21/2020"},]);
        let anotherId = uniqid();
        setMyEducation(myEducation => [{id: anotherId, degree: "", school: "", year: ""}]);
        let yetAnotherId = uniqid();
        setMySkills(mySkills => [{id: yetAnotherId, skill: ""}])
    }, [])

    const handleAddJob = (event) => {
        event.preventDefault();
        const newId = uniqid();
        setPastJobs(pastJobs => [...pastJobs, {id: newId, title: "", company: "", description: "", startdate: "", enddate: ""}]);
    }
    
    const handleAddEducation = (event) => {
        event.preventDefault();
        const newId = uniqid();
        setMyEducation(myEducation => [...myEducation, {id: newId, degree: "", school: "", year: ""}]);
    }

    const handleAddSkill = (event) => {
        event.preventDefault();
        const newId = uniqid();
        setMySkills(mySkills => [...mySkills, {id: newId, skill: ""}])
    }

    const handleCreate = (event) => {
        event.preventDefault();
        theFinal = [];
        theFinal.push(personalInfo, currentJob, pastJobs, myEducation, mySkills);
        var toSend = JSON.stringify(theFinal);
        createResume(toSend);
    }

    return (
        <div className="container">
            <div  className="row">
                <div className="col-md-12 bg-color-lightgray">
                    <form action="">
                        <Personal 
                            myInfo={personalInfo}
                            setMyInfo={setPersonalInfo}
                        />
                        <div>
                            <h3 className="ml-3">Current Job</h3>
                            <label className="from-check-label" htmlFor="notworking">I am not currently working</label>
                            <input type="checkbox" name="notworking" id="notworkingbox" className="form-check-input ml-1" onChange={handleShowBox} />
                            {showCurrent ? (
                                <Currentjob 
                                    jobInfo={currentJob}
                                    setJobInfo={setCurrentJob}
                                />
                            ) : (
                                <div>
                                    <br />
                                    <hr />
                                </div>
                            )}
                        </div>
                        <div>
                            <h3 className="ml-3">Work History</h3>
                            <Jobhistory 
                                oldJobs={pastJobs}
                                setOldJobs={setPastJobs}
                            />
                            <button className="btn btn-secondary mt-2" onClick={handleAddJob}>Add Job History</button>
                        </div>
                        <hr />
                        <div>
                            <h3 className="ml-3">Education</h3>
                            <Education 
                                allEducation={myEducation}
                                setAllEducation={setMyEducation}
                                />
                            <button className="btn btn-secondary mt-2" onClick={handleAddEducation}>Add Education</button>
                            <hr />
                        </div>
                        <div>
                            <h3 className="ml-3">Skills</h3>
                            <Skills 
                                allSkills={mySkills}
                                setAllSkills={setMySkills}
                            />
                            <button className="btn btn-secondary mt-2" onClick={handleAddSkill}>Add Skill</button>
                            <hr />
                        </div>
                        <button className="btn btn-secondary my-2" onClick={handleCreate}>Create Resume</button>
                        <hr />
                    </form>
                </div>
            </div>
        </div>
    )
}