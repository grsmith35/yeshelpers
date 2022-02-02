import React, { useState } from 'react';
import XLSX from 'xlsx';
import { cleanName, fileWriter, nameTrimmer } from '../../utils/helpers';

export default function Payroll() {

    const theArr = [];
    const [isError, setIsError] = useState(false);
    let check = "";

    const handlepayrollclick =(event) => {
        const file = event.target.files[0];
        setIsError(false);
        //setIsFileAdded(true);
        const promise = new Promise((resolve, reject) => {
            //Create items to read excel sheet
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
            //check for error in reading
            fileReader.onerror=((error) => {
                reject(error);
                setIsError(true);
            })
        })
        //open spreadsheet to read each line
        promise.then((data) => {
            if(data[0]["Total Time"] === "(Hours)") {
                check = "conversion";
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
            } else if('Title' in data[0]) {
                check = "timestation";
                for(let i = 0; i < data.length; i++) {
                    let empInfo = nameTrimmer(data[i].Employee);
                    if(data[i]['Total Hours'] < 40) {
                        empInfo.hours = data[i]['Total Hours'];
                        theArr.push(empInfo);
                    } 
                    else {
                        empInfo.hours = 40;
                        theArr.push(empInfo);
                        let secondRow = nameTrimmer(data[i].Employee);
                        secondRow.hours = data[i]['Total Hours'] - 40
                        theArr.push(secondRow);
                    }
                }
            }else {
                setIsError(true)
            }
            if(!isError){
                fileWriter(theArr, check);
            }
        });
    }

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