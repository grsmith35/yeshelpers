import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

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

 }

 export function nameTrimmer(name) {
  const spaceLoc = name.indexOf(" ");
  let newName = {};
  newName.firstName = name.slice(0, spaceLoc).trim();
  newName.lastName = name.slice(spaceLoc).trim();
  return newName;
 }