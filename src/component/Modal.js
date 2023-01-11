import React from "react";

const Modal = () => {
  return (
    <div>
      <form action="#" method="get">
        변경 내용을 입력 해 주세요.
        <input
          type="text"
          name="ID"
          autofocus
          placeholder="아이디를 입력하시오"
        ></input>
      </form>
    </div>
  );
};

export default Modal;
