const formatNumber = (numParam: number | string | undefined) => {
  let formattedNum;
  //@ts-ignore
  let num;
  if (typeof numParam === "string") {
    num = parseInt(numParam);
  } else {
    num = numParam;
  }

  if (num !== 0) {
    formattedNum = num?.toLocaleString("id-ID");
  } else if (num === 0) {
    formattedNum = "0";
  } else {
    formattedNum = "";
  }

  return formattedNum;
};

export default formatNumber;
