const id2016 = "1VAcF0eJ06y_8T4o2gvIL4YcyQy8pxb1zYkgXF76Uu1s";
const id2012 = "1EYjW8l4y-5xPbkTFjdjdpnxOCgVvB8rM_oqjtJhtQKY";
const id2008 = "1deCSqgLqrzFgpUa_S8Gk-8mKrPq47pkx1eqKwZGtSqA";

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
        Authorization:
          "Bearer ya29.GltEB02CiDbJLgzoWnpcF0AEaJXJXSryq5VxLnKQ2fkJ7C9tkKjoSmjWGAf_qb4CrcAalgAgvMPTJR8TnGlhzg4RUAGkHOuuqBlTWLLRhFAD45Fme66IX0_yDyc2"
      }
    }
  );
  const data = await request.json();
  return data;
};
