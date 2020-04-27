import { fields } from "@/config"

export default {
    blog: {
        apiUrl: '/blog/etcetc',
        model: {
            title: fields.STRING,
            text: fields.STRING,
        }
    }
}