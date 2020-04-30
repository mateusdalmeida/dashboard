import { fields, modules_types } from "@/config/consts"

export default {
    blog: {
        apiUrl: '/blog',
        modules_types: modules_types.VIEW,
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
        modules_types: modules_types.CRUD,
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
        modules_types: modules_types.CRUD,
        auto_import: true,
        model: {
            title: fields.STRING
        }
    }
}