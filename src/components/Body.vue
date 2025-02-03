<template>
  <v-app-bar :title="category"></v-app-bar>
  <quill-editor
    :class="{ tickEditOn: !readOnly, ticketDescriptionReadonly: readOnly }"
    placeholder="Enter Ticket Details"
    v-model:content="content"

    :read-only="readOnly"
    :key="editorKey"
  />
  <v-btn @click="toggleEditMode" color="#07bedf" class="btnStyle">
    {{ readOnly ? "Edit" : "Save" }}
  </v-btn>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { useTaskStore } from "../store/index";
import Delta from "quill-delta";

export default {
  props: {
    category: String,
    id: Number,
  },
  components: {
    QuillEditor,
  },
  data() {
    return {
      content: new Delta(),
      readOnly: true,
      selectedData: null,
      editorKey: 0, // To force re-render when needed
      editorOptions: {
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
          ],
        },
      },
    };
  },
  async mounted() {
    console.log(this.id)
    this.loadData(); 
  },
  methods: {
    async loadData() {
      try {
        console.log("bofy")
        const store = useTaskStore();
        const data = await store.getItemsbyId(this.id);

        this.selectedData = data;
        console.log(this.selectedData[0])

        if (
          Array.isArray(this.selectedData) &&
          this.selectedData[0] &&
          this.selectedData[0].note
        ) {
          const mainContent = this.selectedData[0].note;

          // Ensure content is properly formatted
          if (typeof mainContent === "string") {
            this.content = new Delta().insert(mainContent);
          } else if (typeof mainContent === "object" && mainContent.ops) {
            this.content = new Delta(mainContent);
          } else {
            console.warn("Invalid format for 'main' content. Resetting to empty.");
            this.content = new Delta();
          }
        } else {
          this.content = new Delta(); // Fallback to empty content
        }
        console.log(this.content)
      } catch (error) {
        console.error("Error fetching data:", error);
        this.content = new Delta(); // Reset on error
      }
    },
    async toggleEditMode() {
      this.readOnly = !this.readOnly;

      if (this.readOnly) {
        console.log("Saved content:", this.content);
        
        // Save the updated content to the store when toggling to "Save" mode
        const store = useTaskStore();
        await store.updateItem({
          id: this.id,
          main: this.content // The updated content
        });
      }

      // Force re-render of the editor
      this.editorKey += 1;
    },
  },
  watch: {
    id: {
      handler() {
        this.loadData(); // Reload data whenever `id` changes
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.btnStyle {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

</style>
<style>
.ql-toolbar {
  color: #f0f0f0;
  border: none;
}
.ql-container.ql-snow{
  border:none
}
.ql-toolbar.ql-snow{
  border:none;
}
.ticketCon
{
  overflow-y: auto;
  height: 100%;
}
</style>
