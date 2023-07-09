export default function checkInputResult(txt, lettersObject) {
  if (!txt.length || !lettersObject) {
    return;
  }

  let matches = [];
  let excludes = [];

  for (let i = 0; i < txt.length; i++) {
    if (txt[i] in lettersObject) {
      let index = lettersObject[txt[i]].indexOf(i);
      if (index > -1) {
        matches.push(i);
      } else {
        excludes.push(i);
      }
    }
  }

  return {
    matches,
    excludes,
  };
}
