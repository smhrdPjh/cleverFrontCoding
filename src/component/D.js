  const planModification = () => {
    var result = selectedWorkerList.current.map((item, index) => {
      return (
        <tr key={`${item.workerName}${index}`}>
          <select
            onChange={(e) => {
              selectedWorkerList.current[index].workerName = e.target.value;
            }}
            defaultValue={item.workerName}
          >
            {workerListRendering()}
          </select>
          <input
            type="time"
            defaultValue={item.startTime}
            onChange={(e) => {
              selectedWorkerList.current[index].startTime = e.target.value;
            }}
          />
          ~
          <input
            type="time"
            defaultValue={item.endTime}
            onChange={(e) => {
              selectedWorkerList.current[index].endTime = e.target.value;
              console.log("투데이배열", selectedWorkerList.current);
            }}
          />
          <button
            onClick={() => {
              selectedWorkerList.current.splice(index, 1);
              setThisDayListState([selectedWorkerList.current]);
            }}
          >
            삭제
          </button>
        </tr>
      );
    });

    return result;
  };