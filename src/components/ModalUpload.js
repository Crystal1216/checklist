import { useState } from "react";
import "../styles/ModalUpload.css";

const ModalUpload = ({ setOpenModal, setStudentList }) => {
  const [inputFile, setInputFile] = useState("");
  const fileSelectHandler = (event) => {
    setInputFile(event.target.files[0]);
  };
  const uploadListHandler = () => {
    if (inputFile !== "") {
      readExcel(inputFile);
    } else {
      alert("Choose File First");
    }
    // const workbook = xlsx.readFile(fileName);
    // const sheetNames = workbook.SheetNames;
    // console.log(sheetNames);
  };
  const readExcel = async (file) => {
    const fileReader = await new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e) => {
      const bufferArray = e?.target.result;
      const XLSX = require("xlsx");
      const wb = XLSX.read(bufferArray, { type: "buffer" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      // const fileName = file.name.split(".")[0];
      // data.map((e) => console.log(e.num, e.name));
      // setStudentList([]);
      if (data[0].num === undefined) {
        window.alert("Wrong File Format");
      } else {
        const newList = data.map((el) => {
          return { num: el.num, name: el.name, id: el.num, unSubmitted: [] };
        });
        if (
          window.confirm("Current Students List will be ALL deleted. Continue?")
        ) {
          setStudentList([...newList]);
          setOpenModal(false);
        }
      }
    };
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="modal-title">
          <h1>Upload NameList</h1>
        </div>
        <div className="modal-body">
          <div className="modal-class-div">
            <input placeholder="grade" />
            <input placeholder="class" />
          </div>
          <label className="modal-file">
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={fileSelectHandler}
            />
            Select File
          </label>
          <p>{inputFile.name}</p>
          <div className="modal-btn-div">
            <button className="modal-btn-upload" onClick={uploadListHandler}>
              Upload
            </button>
            <button
              className="modal-btn-cancel"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
        <div className="modal-table">
          <p>※Select Excel File with Format Below!</p>
          <p>Ex)</p>
          <table>
            <tbody>
              <tr>
                <td className="td-row"></td>
                <td className="td-ex">A</td>
                <td className="td-ex">B</td>
                <td className="td-ex">C</td>
              </tr>
              <tr>
                <td className="td-row">1</td>
                <td>num</td>
                <td>name</td>
                <td></td>
              </tr>
              <tr>
                <td className="td-row">2</td>
                <td>1</td>
                <td>김철수</td>
                <td></td>
              </tr>
              <tr>
                <td className="td-row">3</td>
                <td>2</td>
                <td>홍길동</td>
                <td></td>
              </tr>
              <tr>
                <td className="td-row">...</td>
                <td>...</td>
                <td>...</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ModalUpload;
