import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Document,
  createParagraph,
HeadingLevel,
Packer,
Paragraph,
VerticalAlign,
HorizontalPosition,
TextRun} from 'docx';
import { Buffer } from 'buffer';
import { jsPDF } from 'jspdf';


export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

export function cleanName(string) {
  let nameArr = {fName: "", lName: ""};
  switch(string) {
    case 'octayvialong':
      nameArr.fName = "Octavia";
      nameArr.lName = "Long";
      return nameArr;

    case 'RANDOLPHTRYON':
      nameArr.fName = "Randolph";
      nameArr.lName = "Tryon";
        return nameArr;

    case 'BriannaGarcia1':
      nameArr.fName = "Brianna";
      nameArr.lName = "Garcia";
      return nameArr;

    case 'JustinMcNemar':
      nameArr.fName = "Justin";
      nameArr.lName = "McNemar";
      return nameArr;

    case 'LaConstanceKing':
      nameArr.fName = "LaConstance";
      nameArr.lName = "King"
      return nameArr;

    case 'ZabryannaMarieBullard':
      nameArr.fName = "Zabryana Maria";
      nameArr.lName = "Bullard";
      return nameArr;

    default:
      let newName = string.charAt(0).toLowerCase() + string.slice(1);
      let location = newName.search(/([A-Z])/g)
      nameArr.fName = string.slice(0, location);
      nameArr.lName = string.slice(location);
      return nameArr;
  }
}
 export function fileWriter(arr, check) {
  const currentDate = Date.now();
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  let fileName ="";
  if(check === "conversion") {
    fileName = `${currentDate} conversion calls`;
  } else {
    fileName = `${currentDate} time station`;
  }
  const ws = XLSX.utils.json_to_sheet(arr);
  const wb = {Sheets: { 'data': ws }, SheetNames: ['data']};
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: fileType});
  FileSaver.saveAs(data,fileName+fileExtension);
 };

 export function nameTrimmer(name) {
  const spaceLoc = name.indexOf(" ");
  let newName = {};
  newName.firstName = name.slice(0, spaceLoc).trim();
  newName.lastName = name.slice(spaceLoc).trim();
  return newName;
 };

 //formatNumber = (number) => {

 //};

 export function createResume(toSend) {
  let currDesc = 0;
  const newStuff = JSON.parse(toSend);
  console.log(newStuff)
  const doc = new jsPDF({
    maxWidth: 50
  });
  doc.setFont('times', 'normal', 'bold');
  doc.setFontSize(25);
  let nameMid = 92 - (newStuff[0].fullname.length);
  doc.text(newStuff[0].fullname, nameMid, 20);
  doc.setFont('times', 'normal', 'normal');
  doc.setFontSize(14);
  let address = `${newStuff[0].address} ${newStuff[0].city}, ${newStuff[0].state} ${newStuff[0].zip}`
  let addLen = 100 - address.length;
  doc.text(address, addLen, 27)
  let phone = 102 - (newStuff[0].number.length);
  doc.text(newStuff[0].number, phone, 33);
  doc.setFont('times', 'underline', 'normal');
  doc.setTextColor('#3636f7');
  let emailLoc = 100 - newStuff[0].email.length
  doc.text(newStuff[0].email, emailLoc, 39);
  doc.setTextColor('#000000');

  //add work history title
  doc.setFont('times', 'normal', 'bold');
  doc.setTextColor('#474747');
  doc.text("Work History",20, 48);
  doc.text('_____________________________________________________________________', 20, 48);

  //add current job
  if(newStuff[1].title !== "") {
    //job title
    doc.setTextColor('#000000')
    doc.setFont('times', 'normal', 'bold');
    doc.setFontSize(18);
    doc.text(newStuff[1].title, 20, 55);
    //company
    doc.setFont('times', 'normal', 'normal');
    doc.setFontSize(14);
    doc.setTextColor('#474747');
    doc.text(newStuff[1].company, 20, 60);
    //work dates
    doc.text(`${newStuff[1].startdate} to Current`, 20, 65);
    //description
    doc.setTextColor('#000000')
    var workArr = doc.splitTextToSize(newStuff[1].description, 170);
    currDesc = workArr.length*6;
    doc.text(workArr, 20, 70);
  }
  
  let movingSpot = 70 + currDesc;
  for(let i = 0; i < newStuff[2].length; i++) {
    //set the job title
    doc.setFont('times', 'normal', 'bold');
    doc.setFontSize(18);
    doc.text(newStuff[2][i].title, 20, movingSpot);
    //set the company and dates
    movingSpot = movingSpot + 5;
    doc.setFont('times', 'normal', 'normal');
    doc.setFontSize(14);
    doc.setTextColor('#474747');
    doc.text(newStuff[2][i].company, 20, movingSpot);
    //dates
    movingSpot = movingSpot + 5;
    doc.text(`${newStuff[2][i].startdate} to ${newStuff[2][i].enddate}`, 20, movingSpot);
    //job description
    movingSpot = movingSpot + 5;
    doc.setTextColor('#000000');
    var descArr = doc.splitTextToSize(newStuff[2][i].description, 170)
    doc.text(descArr, 20, movingSpot);
    let descSize = descArr.length*6;
    if(descSize < 10) {
      descSize = 10;
    }
    movingSpot = movingSpot + descSize;
  }

  //add education
  if(newStuff[3][0].degree !== "") {
    movingSpot = movingSpot + 5;
    doc.setFont('times', 'normal', 'bold');
    doc.setTextColor('#474747');
    doc.text("Education",20, movingSpot);
    doc.text('_____________________________________________________________________', 20, movingSpot);
    movingSpot = movingSpot + 7;
    //iterate through each
    for(let i = 0; i < newStuff[3].length; i++) {
      doc.setFont('times', 'normal', 'bold');
      doc.setTextColor('#000000');
      doc.text(newStuff[3][i].degree, 20, movingSpot);
      movingSpot = movingSpot + 5;
      doc.setFont('times', 'normal', 'normal');
      doc.setTextColor('#474747');
      doc.text(`${newStuff[3][i].school} - ${newStuff[3][i].year}`, 20, movingSpot);
      movingSpot = movingSpot + 6;
    }
  }

  //add skills
  if(newStuff[4][0].skill !== "") {
    movingSpot = movingSpot + 5;
    doc.setFont('times', 'normal', 'bold');
    doc.setTextColor('#474747');
    doc.text("Skills",20, movingSpot);
    doc.text('_____________________________________________________________________', 20, movingSpot);
    movingSpot = movingSpot + 7;

    //iterate through skills
    for(let i = 0; i < newStuff[4].length; i++) {
      doc.setFont('times', 'normal', 'normal');
      doc.setTextColor('#000000');
      doc.text(`- ${newStuff[4][i].skill}`, 20, movingSpot);
      movingSpot = movingSpot + 5;
    }
  }
  

  doc.save(`${newStuff[0].fullname} resume.pdf`);
};