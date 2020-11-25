export default function fone(num) {
  var fone = num.split("");
  var formated = "";
  switch (fone.length) {
    case 1:
      formated = fone[0];
      break;
    case 2:
      formated = fone.join("") + " ";
      break;
    case 3:
      formated = fone.slice(0, 2).join("") + " " + fone[2];
      break;
    case 4:
      formated = fone.slice(0, 2).join("") + " " + fone.slice(2).join("");
      break;
    case 5:
      formated = fone.slice(0, 2).join("") + " " + fone.slice(2).join("");
      break;
    case 6:
      formated = fone.slice(0, 2).join("") + " " + fone.slice(2).join("");
      break;
    case 7:
      formated = fone.slice(0, 2).join("") + " " + fone.slice(2).join("");
      break;
    case 8:
      formated =
        fone.slice(0, 2).join("") +
        " " +
        fone.slice(2, 7).join("") +
        "-" +
        fone.slice(7).join("");
      break;
    case 9:
      formated =
        fone.slice(0, 2).join("") +
        " " +
        fone.slice(2, 7).join("") +
        "-" +
        fone.slice(7).join("");
      break;
    case 10:
      formated =
        fone.slice(0, 2).join("") +
        " " +
        fone.slice(2, 7).join("") +
        "-" +
        fone.slice(7).join("");
      break;
    case 11:
      formated =
        fone.slice(0, 2).join("") +
        " " +
        fone.slice(2, 7).join("") +
        "-" +
        fone.slice(7).join("");
      break;
    default:
      return;
  }
  return formated;
}
