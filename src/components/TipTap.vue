<template>
  <div>
    <editor
      @input="input"
      v-model="richText"
      :extensions="extensions"
      :native-extensions="nativeExtensions"
    />
  </div>
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
  CodeBlock,
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
import { CodeBlockHighlight } from "tiptap-extensions";
import javascript from "highlight.js/lib/languages/javascript";
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
        CodeBlock,
        HorizontalRule,
        Paragraph,
        HardBreak,
      ],
      nativeExtensions: [
        new CodeBlockHighlight({
          languages: {
            javascript,
          },
        }),
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
<style lang="scss">
pre {
  &::before {
    content: attr(data-language);
    text-transform: uppercase;
    display: block;
    text-align: right;
    font-weight: bold;
    font-size: 0.6rem;
  }
  code {
    .hljs-comment,
    .hljs-quote {
      color: #999999;
    }
    .hljs-variable,
    .hljs-template-variable,
    .hljs-attribute,
    .hljs-tag,
    .hljs-name,
    .hljs-regexp,
    .hljs-link,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class {
      color: #f2777a;
    }
    .hljs-number,
    .hljs-meta,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params {
      color: #f99157;
    }
    .hljs-string,
    .hljs-symbol,
    .hljs-bullet {
      color: #99cc99;
    }
    .hljs-title,
    .hljs-section {
      color: #ffcc66;
    }
    .hljs-keyword,
    .hljs-selector-tag {
      color: #6699cc;
    }
    .hljs-emphasis {
      font-style: italic;
    }
    .hljs-strong {
      font-weight: 700;
    }
  }
}
</style>
