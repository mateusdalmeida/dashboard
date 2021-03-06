import { fields, module_type } from "@/config/consts";

export default {
  blog: {
    apiUrl: "/blog",
    module_type: module_type.CRUD,
    model: {
      title: fields.STRING,
      text: fields.RICHTEXT,
      tag: {
        type: fields.RADIO_BTN,
        // as tags de um blog usam o module tags
        items: fields.MODULE("tags"),
      },
      multi: {
        type: fields.MULTIPLE,
        items: fields.STRING,
      },
    },
  },
  users: {
    apiUrl: "/users",
    module_type: module_type.CUSTOM,
    model: {
      name: fields.STRING,
      email: fields.STRING,
      nacionatity: fields.STRING,
      birthday: fields.DATE,
      type: fields.BOOLEAN,
    },
  },
  tags: {
    apiUrl: "/tags",
    module_type: module_type.VIEW,
    model: {
      title: fields.STRING,
      image: fields.IMG_PICKER,
    },
  },
  gallery: {
    apiUrl: "/gallery",
    module_type: module_type.IMG_GALLERY,
  },
};
