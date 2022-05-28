import "../styles/Group.css";
import Local from "../components/Local";
import Check from "../components/Check";
import { useEffect, useState } from "react";

const Group = () => {
  const [num, setNum] = useState("");
  const [groupList, setGroupList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [sort, setSort] = useState(false);
  const [selected, setSelected] = useState("");
  const [save, setSave] = useState(false);
  const checkedItems = new Set();

  useEffect(() => {
    Local.getLocalStudents({ studentList, setStudentList });
    Local.getLocalGroups({ groupList, setGroupList });
  }, []);
  useEffect(() => {
    if (save) {
      localStorage.setItem("groups", JSON.stringify(groupList));
      setSave(false);
    }
  }, [save, groupList]);
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(studentList));
  }, [studentList]);
  useEffect(() => {
    if (selected !== "") {
      groupList
        .find((el) => el.id === selected)
        .member.map((el) => checkedItems.add(el));
    }
  }, [selected]);
  useEffect(() => {
    groupList.sort((a, b) => {
      return a.id - b.id;
    });
    setSort(true);
  }, [groupList]);
  useEffect(() => {
    saveLocalGroups();
    setSort(false);
  }, [sort]);

  const numHandler = (event) => {
    const number = event.target.value;
    if (number.length > 2) {
      setNum(Number(number.substr(0, 2)));
    } else {
      if (number < 1) {
        setNum("");
      } else {
        setNum(Number(event.target.value));
      }
    }
  };
  const addGroupList = (event) => {
    event.preventDefault();
    if (num !== "") {
      if (!groupList.find((group) => group.id === num)) {
        setGroupList([...groupList, { id: num, member: [] }]);
      }
    }
    setNum("");
  };
  const delGroupList = (event) => {
    event.preventDefault();
    setGroupList(groupList.filter((group) => group.id !== num));
    setNum("");
  };
  const saveLocalGroups = () => {
    localStorage.setItem("groups", JSON.stringify(groupList));
  };
  const groupBtnHandler = (event) => {
    setSelected(Number(event.target.value));
  };
  const saveChecksHandler = (event) => {
    event.preventDefault();
    if (selected !== "") {
      setGroupList(
        groupList.map((group) => {
          if (group.id === selected) {
            return {
              ...group,
              member: [...checkedItems],
            };
          } else {
            const newMember = group.member.filter(
              (el) => ![...checkedItems].includes(el)
            );
            return {
              ...group,
              member: newMember,
            };
          }
        })
      );
      addSubmitList();
    }
  };
  const addSubmitList = () => {
    setStudentList(
      studentList.map((student) => {
        if ([...checkedItems].includes(student.id)) {
          return {
            ...student,
            group: selected,
          };
        }
        return {
          ...student,
        };
      })
    );
    setSave(true);
    window.alert("success");
  };
  const checkedItemHandler = (id, isChecked) => {
    if (selected !== "") {
      if (checkedItems.size === 0) {
        groupList
          .find((el) => el.id === selected)
          .member.map((el) => checkedItems.add(el));
      }
      if (isChecked && !checkedItems.has(id)) {
        checkedItems.add(id);
      }
      if (!isChecked && checkedItems.has(id)) {
        checkedItems.delete(id);
      }
    }
  };

  return (
    <div className="Group">
      <h1>Group Management</h1>
      <form className="group-add-form">
        <input
          type="number"
          value={num}
          onChange={numHandler}
          placeholder="Group"
        />
        {!groupList.find((group) => group.id === num) && (
          <button className="add" onClick={addGroupList}>
            ADD
          </button>
        )}
        {groupList.find((group) => group.id === num) && (
          <button className="del" onClick={delGroupList}>
            DEL
          </button>
        )}
      </form>
      <div className="group-div">
        {groupList.map((group) => (
          <button
            className="group-num-btn"
            id={group.id === selected ? "num-selected" : ""}
            key={group.id}
            value={group.id}
            onClick={groupBtnHandler}
          >
            {group.id}
          </button>
        ))}
      </div>
      <form className="group-check-form">
        <div>
          <p> {selected === "" ? "ALL" : `Group ${selected}`}</p>
          <button
            className="group-save-btn"
            type="submit"
            onClick={saveChecksHandler}
          >
            SAVE
          </button>
        </div>
        <div className="check-ul-div">
          <ul className="check-ul">
            {studentList.map((student) => (
              <Check
                student={student}
                checkedNum={
                  selected !== ""
                    ? groupList.find((el) => el.id === selected).member
                    : []
                }
                key={student.id}
                checkedItemHandler={checkedItemHandler}
              />
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
};

export default Group;
