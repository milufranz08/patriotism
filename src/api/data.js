//Token
const token =
  "ya29.GlxEBxC28WIv4osf0GotYSiz2409B0oQecVugZDbITwPeiJqwvlv9jgHWfZDVyrkQMRS-aJVpX6xl7tew-CdFPLuK0-u_rQ8ra8eU3TrxFXIjnWkMqpzaSclbJlrjQ";
//Turonout Data
const id2016 = "1VAcF0eJ06y_8T4o2gvIL4YcyQy8pxb1zYkgXF76Uu1s";
const id2012 = "1EYjW8l4y-5xPbkTFjdjdpnxOCgVvB8rM_oqjtJhtQKY";
const id2008 = "1deCSqgLqrzFgpUa_S8Gk-8mKrPq47pkx1eqKwZGtSqA";

//Population Distribution by Age
const ageDist = "1B-EPkxTa1ydBYMj0OcQbD1GWw2obPeqmY0Q2O-Az3Gg";

export const getData = year => {
  let id;
  if (year === 2016) id = id2016;
  else if (year === 2012) id = id2012;
  else if (year === 2008) id = id2008;
  return getSheetValues(id);
};

export const getSheetValues = async id => {
  const request = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/A4:I54`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
  );
  const data = await request.json();
  return data;
};

export const getAgeDistData = async () => {
  const request = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${ageDist}/values/A5:G56`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
  );
  const data = await request.json();
  console.log({ data });
  return data;
};
