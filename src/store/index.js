import { defineStore } from 'pinia';
import { db } from '@/firebase';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    listData: [],
    categories: [
      { category: 'To-Do', icon: "mdi-list-box-outline" },
      { category: 'Paragraph', icon: "mdi-menu" },
      { category: 'Reminder', icon: "mdi-refresh" }
    ]
  }),

  getters: {
    getCategory(state) {
      return state.categories;
    },
    getItemsByCategoryWithoutMain: (state) => (category) => {
      return state.listData
        .filter(item => item.category === category)
        .map(item => ({ id: item.id, title: item.title }));
    },
    getItems: (state) => (id) => {
      const result = state.listData.filter(item => item.id === id);
      if (result.length === 0) {
        console.warn(`Item with id ${id} not found in the store.`);
      }
      return result;
    }
  },

  actions: {
    async fetchTasks() {
      try {
        const querySnapshot = await getDocs(collection(db, "tasks"));
        this.listData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },

    async addItem(newItem) {
      try {
        const docRef = await addDoc(collection(db, "tasks"), newItem);
        this.listData.push({ id: docRef.id, ...newItem });
      } catch (error) {
        console.error("Error adding task:", error);
      }
    },

    async deleteItem(itemId) {
      try {
        await deleteDoc(doc(db, "tasks", itemId));
        this.listData = this.listData.filter(item => item.id !== itemId);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    },

    async updateItem(updatedItem) {
      try {
        const itemRef = doc(db, "tasks", updatedItem.id);
        await updateDoc(itemRef, { main: updatedItem.main });
        const itemIndex = this.listData.findIndex(item => item.id === updatedItem.id);
        if (itemIndex !== -1) {
          this.listData[itemIndex].main = updatedItem.main;
        } else {
          console.warn(`Item with id ${updatedItem.id} not found for update.`);
        }
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  }
});
