<template>
  <v-layout>
    <!-- First Navigation Drawer (Categories) -->
    <v-navigation-drawer theme="dark" permanent rail>
      <v-list-item :prepend-avatar="avatar" nav />
      <v-divider />
      <v-list
        v-for="item in categories"
        :key="item.category"
        density="compact"
        nav
      >
        <v-list-item
          :class="{'selectedTab': selectedCategory === item.category}"
          :prepend-icon="item.icon"
          @click="selectCategory(item.category)"
        >
          {{ item.category }}
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Second Navigation Drawer (Filtered Items) -->
    <v-navigation-drawer permanent>
      <v-list v-for="item in filteredItems" :key="item.id">
        <v-list-item
          :class="{'selectedTab': selectedItem === item.id}"
          @click="selectItem(item.id)"
        >
          <!-- Delete Icon -->
          <v-icon @click.stop="deleteItem(item.id)">mdi-delete</v-icon>
          {{ item.title }}
        </v-list-item>
      </v-list>

      <!-- Add Button at the bottom -->
      <v-btn @click="addNewItem" color="primary" class="addButton">
        Add Item
      </v-btn>
    </v-navigation-drawer>

    <v-main style="height: 300px">
      <Body :category="selectedCategory" :id="selectedItem" />
    </v-main>
  </v-layout>
</template>

<script>
import { useTaskStore } from "../store/index";

export default {
  data() {
    return {
      avatar: "https://randomuser.me/api/portraits/women/75.jpg",
      selectedCategory: null, 
      selectedItem: null,
      filteredItems:null,
      categories: null,
      userID: null
    };
  },
  beforeUnmount(){
    
  },
  mounted() {
    this.userID = localStorage.getItem('userID')
    console.log("mounted", this.userID)
    this.filteredItem(this.userID)
    this.Category(this.userID)
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category;
      this.selectedItem = null;
      this.filteredItems = useTaskStore().getNotesByCategory(category)
    },
    async filteredItem(id) {
      const response = await useTaskStore().getItems(id)
      this.filteredItems = response
    },
    async Category(id) {
      const response = await useTaskStore().getCategor(id)
      this.categories = response

    },
    selectItem(itemId) {
      this.selectedItem = itemId;
    },
    async deleteItem(itemId) {
      const store = useTaskStore();
      await store.deleteItem(itemId);  
    },
    addNewItem() {
      const newItem = { 
        title: "New Item",
        category: this.selectedCategory,
        note: "New content here",
        userID:'/users/bzRsNcxwyp035qfQzO7A'
      };
      console.log("home")
      useTaskStore().addItem(newItem); // Call the addItem action from the store
    }
  }
};
</script>

<style scoped>
.selectedTab {
  background-color: #07bedf;
}

/* Styling for the Add Button */
.addButton {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
