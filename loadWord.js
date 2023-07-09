const API_URL = "https://random-word-api.herokuapp.com/word";

export default async function loadWord(length) {
  try {
    const respone = await fetch(API_URL + "?length=" + length);
    const res = await respone.json();
    return res[0];
  } catch (error) {
    console.log(error);
  }
}
