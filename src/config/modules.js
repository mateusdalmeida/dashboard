import { fields, module_type } from "@/config/consts"

export default {
    blog: {
        apiUrl: '/blog',
        module_type: module_type.VIEW,
        auto_import: true,
        model: {
            title: fields.STRING,
            text: fields.STRING,
            tag: {
                type: fields.RADIO_BTN,
                // as tags de um blog usam o module tags
                items: fields.MODULE("tags")
            }
        }
    },
    users: {
        apiUrl: '/users',
        module_type: module_type.CRUD,
        model: {
            name: fields.STRING,
            email: fields.STRING,
            nacionatity: fields.STRING,
            birthday: fields.DATE,
            type: fields.BOOLEAN,
        }
    },
    tags: {
        apiUrl: '/tags',
        module_type: module_type.CRUD,
        auto_import: true,
        model: {
            title: fields.STRING
        }
    }
}