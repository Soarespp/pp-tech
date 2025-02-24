export function generateEncodedKey() {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, "0");
  const hour = date.getHours().toString().padStart(2, "0");
  const second = date.getSeconds().toString().padStart(2, "0");

  const seed = parseInt(day + hour + second);

  let key = `${day}${hour}${second}`; // Primeiros 6 dígitos são a data codificada

  for (let i = 0; i < 19; i++) {
    const random = Math.floor(Math.abs(Math.sin(seed + i) * 10));
    key += random;
  }

  return key;
}

export function decodeKey(key) {
  if (key?.length !== 25) return null;

  const day = key.slice(0, 2);
  const hour = key.slice(2, 4);
  const second = key.slice(4, 6);

  return {
    day: parseInt(day),
    hour: parseInt(hour),
    second: parseInt(second),
  };
}

const fixedCode = "080411";
export function generateUserToken(username, password) {
  let code = fixedCode + username + fixedCode + password + fixedCode;
  const token = btoa(code);
  return token;
}

export function decodeUserToken(paramToken) {
  if (!paramToken || paramToken === "undefined") {
    return { isValid: false };
  }

  const decodeToken = atob(paramToken); //apagar a de baixos
  // const decodeToken = atob("MDgwNDExcGVkcm8wODA0MTFwZWRybzA4MDQxMQ=="); //apagar a de baixos

  if (
    String(decodeToken).substring(1, 6) !== fixedCode &&
    String(decodeToken).substring(
      decodeToken.length - 6,
      decodeToken.length
    ) !== fixedCode
  )
    return null;

  const dados = decodeToken.split(fixedCode);

  return {
    user: dados[1],
    pass: dados[2],
    isValid: true,
  };
}
