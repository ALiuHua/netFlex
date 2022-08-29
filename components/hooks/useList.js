import React, { useState, useEffect } from "react";
const useList = (item, user, profileName) => {
  const [isInMyList, setIsInMyList] = useState(false);
  const [listIconState, setListIconState] = useState(false);
  useEffect(() => {
    let currentRender = true;
    const checkListInfo = async () => {
      const response = await fetch(
        `/api/auth/addToList?itemId=${item?.id}&user=${user}&profileName=${profileName}`
      );
      const data = await response.json();
      if (currentRender) {
        setListIconState(true);
        if (data.isInMylist) {
          setIsInMyList(true);
        }
      }
    };
    if (item?.id) checkListInfo(item?.id);
    return () => (currentRender = false);
  }, [item?.id, user, profileName]);
  const addToListHandler = async (item, category) => {
    const response = await fetch("/api/auth/addToList", {
      method: "POST",
      body: JSON.stringify({
        data: category ? { ...item, category } : item,
        action: isInMyList ? "remove" : "add",
        user,
        profileName,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return response;
  };
  return { isInMyList, setIsInMyList, listIconState, addToListHandler };
};

export default useList;
