const manejadorPasayo1 = (error) => {
  let hint;
  switch (error) {
    case "Unexpected identifier" :
      hint = "Parece que hay un error de sintaxis en tu código. Verificá que no hayan declaraciones de variables mal definidas o asignaciones a variables mal escritas."
      break;
    default: hint=error.message;
  }
  return hint;
}


const manejadorPasayo = (error) => {
let hint= error.message;
console.log("entro al manejador")
if (error instanceof SyntaxError) {
        hint = "Parece que hay un error de sintaxis en tu código. Por ejemplo, podrías verificar que no falten o sobren llaves ni paréntesis."
  }
else if (error instanceof EvalError) {
      hint = "Parece que hay un error de evaluación en tu código."
}
else if (error instanceof RangeError) {
      hint = "Parece que hay un error de rangos en tu código. "
}
else if (error instanceof ReferenceError) {
  let existe = error.message.includes("is not defined");
  console.log("entro a ReferenceError")
  if (existe) {
    let espacio = error.message.indexOf(" ")
    let laVariable = error.message.substring(0,espacio)
    hint = "El identificador "+laVariable+" no está definido. Si se trata de una variable, no te olvides de declararlo primero de esta forma: let "+laVariable
  }else
      hint = "Parece que estas usando variables sin definir. Recordá que antes de usar una variable debes definirla así: let miVariable"
}
else if (error instanceof TypeError) {
      hint = "Parece que hay un error de tipos en tu código."
}

return hint;
}

export default manejadorPasayo
