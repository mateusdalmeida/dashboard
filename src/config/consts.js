//no edit this file

export const fields = {
    STRING: "string",
    DATE: "date",
    BOOLEAN: "boolean",
    RADIO_BTN: "radio_btn",
    // retorna um objeto com a key module e o valor 
    // é o nome do modulo
    MODULE: function module(moduleName) {
        return { module: moduleName }
    }
}

export const module_type = {
    CRUD: "crud",
    VIEW: "view",
    IMG_GALLERY: "img_gallery",
    CALENDAR: "calendar",
    CUSTOM: "custom"
}