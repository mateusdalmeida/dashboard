import { fields, modules_types } from "@/config/consts"

export default {
    blog: {
        apiUrl: '/blog/etcetc',
        modules_types: modules_types.CRUD,
        auto_import: true,
        model: {
            title: fields.STRING,
            text: fields.STRING,
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
            type: fields.BOOLEAN
        }
    }
}