export default async function convertAPI(payload) {
  console.log(`env: ${process.env.REACT_APP_API_URL}`);
  const response = await fetch(`${process.env.REACT_APP_API_URL}/convert`, {
    method: "POST",
    body: JSON.stringify(payload),
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // console.log(`response ${response}`);
  try {
    const responseJson = await response.json();
    console.log(responseJson);
    return responseJson;
  } catch {
    return null;
  }
}
