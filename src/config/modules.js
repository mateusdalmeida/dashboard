import { fields, modules_types } from "@/config/consts"

export default {
    blog: {
        apiUrl: '/blog/etcetc',
        modules_types: modules_types.CRUD,
        model: {
            title: fields.STRING,
            text: fields.STRING,
        }
    }
}