const manejadorPasayo = (error) => {
  let hint;
  switch (error) {
    case "Unexpected identifier" :
      hint = "Parece que hay un error de sintaxis en tu código. Verificá que no hayan declaraciones de variables mal definidas o asignaciones a variables mal escritas."
      break;
    default: hint=error;
  }
  return hint;
}

export default manejadorPasayo
