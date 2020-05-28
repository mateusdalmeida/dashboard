<template>
  <editor @input="input" v-model="richText" :extensions="extensions" />
</template>
<script>
import ImageSelector from "@/components/ImageSelector";
import {
  TiptapVuetify,
  Image,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from "tiptap-vuetify";
export default {
  components: {
    editor: TiptapVuetify,
  },
  data() {
    return {
      richText: "",
      extensions: [
        History,
        [
          Image,
          {
            options: {
              imageSourcesOverride: true,
              imageSources: [
                { component: ImageSelector, name: "Escolher imagem" },
              ],
            },
          },
        ],
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3],
            },
          },
        ],
        Bold,
        Code,
        HorizontalRule,
        Paragraph,
        HardBreak,
      ],
    };
  },
  methods: {
    input() {
      this.$emit("input", this.richText);
    },
  },
};
</script>
