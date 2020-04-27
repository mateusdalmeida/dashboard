// modelo que vai ser chamado no dialogo
// atualmente os unicos campos que imaginei sao string, date e boolean

// os campos devem ser configurados em um arquivo separado e so importado
// pra ser usado no model, acho que assim fica mais organizado
// ex: name: fields.STRING ou algo assim

let userModel = {
    name: "string",
    email: "string",
    nacionatity: "string",
    birthday: "date",
    type: "boolean"
}

module.exports = userModel;