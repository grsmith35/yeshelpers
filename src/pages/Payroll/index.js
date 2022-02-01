import React, { useState } from 'react';
import XLSX from 'xlsx';
import { cleanName, fileWriter } from '../../utils/helpers';

export default function Payroll() {

    const [file, setFile] = useState()
    const [isFileAdded, setIsFileAdded]= useState(false);
    const theArr = [];
    const [isError, setIsError] = useState(false);

    const handlepayrollclick =(event) => {
        console.log('we are in here.')
        const file = event.target.files[0];
        setIsError(false);
        //setIsFileAdded(true);
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload=(e)=> {
                const bufferArray=e.target.result;

                const wb=XLSX.read(bufferArray,{type: 'buffer'});

                const wsname=wb.SheetNames[0];

                const ws=wb.Sheets[wsname];

                const data=XLSX.utils.sheet_to_json(ws);

                resolve(data);
            };

            fileReader.onerror=((error) => {
                reject(error);
                setIsError(true);
            })
        })
        promise.then((data) => {
            for(let i = 0; i < data.length; i++) {
                if('Agent' in data[i]) {
                    let newName = cleanName(data[i].Agent);
                    //console.log(data[i]);
                    let empInfo = {};
                    empInfo.firstName = newName.fName;
                    empInfo.lastName = newName.lName;
                    empInfo.hours = data[i]["Total Time"];
                    theArr.push(empInfo);
                } else {console.log('not an agent line.')}
            }
            if(theArr.length === 0) {
                setIsError(true)
            } else {
                fileWriter(theArr);
            }
        })
    };

    function handleFileUpload() {
        
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-9 bg-color-lightgray">
                    <h2 className="row ml-1">Payroll Time Conversion Tools</h2>
                    <form>
                        <input type="file" name="filename" id="fileupload" onChange={handlepayrollclick}/>
                        {isError ? (
                            <div className="row m-3">
                                <div className="col-8 wrongfile">Error with spreadsheed! Please try again!</div>
                            </div>
                        ) : (
                            <div>Select a File</div>
                        )}
                        
                    </form>
                </div>
                <div className="col-md-3 bg-color-blue"></div>   
            </div>
        </div>
    )
}