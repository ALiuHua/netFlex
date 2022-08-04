import React, { useState, useEffect } from "react";
const useList = (item, user, profileName) => {
  const [isInMyList, setIsInMyList] = useState(false);
  const [listIconState, setListIconState] = useState(false);
  useEffect(() => {
    let currentRender = true;
    console.log("check list info running outside");
    const checkListInfo = async () => {
      console.log("check list info running inside");
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
    // if (response.ok) {
    //   console.log("add to list handler");
    //   setIsInMyList((prev) => !prev);
    // }
    return response;
  };
  return { isInMyList, setIsInMyList, listIconState, addToListHandler };
};

export default useList;

////==============VERY INPORTANT NOTE FOR ERROR RESOLVE
/*
1. update state after component unmounted, this may result in memory leak.
   normally for this is because we have async function run which update state after it's resolved but we may not at that componet
   anymore when it's resolved. so we need to cancle the state update when this happen . we can use currentRender variable to cancle it 
  https://stackoverflow.com/questions/49906437/how-to-cancel-a-fetch-on-componentwillunmount 

2. a similar situation bug is like in netflex card, we need only when we still hover on it we update async fetched resolved data; otherwise
   we will not update it. in this case it's not mount/nunmount condition, so we need to ref to keep life clcyle to define if we need to update.

*/
