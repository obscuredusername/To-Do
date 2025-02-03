import { defineStore } from 'pinia';
import { db, getUserByEmail, createUser, getNotes, getCategory,createNote } from '../firebase';
import { collection, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
let allNotes = null
export const useTaskStore = defineStore('taskStore', {
  actions: {
    async fetchNotes(data) {
      try {
        return await getNotes(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },
    async getItems(id) {
      try {
        allNotes = await getNotes(id)
        return  allNotes;
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },
    async getCategor(id) {
      try {
        console.log("store",id)
        return await getCategory(id);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },
    getNotesByCategory(category) {
      console.log("cat")
      return allNotes.filter(note => note.category === category);
    },    
    getItemsbyId(id) {
      console.log("===================")
      return allNotes.filter(note => note.id === id);
    }, 
    async addItem(newItem) {
      try {
        console.log("store")
        return await createNote(newItem);
      } catch (error) {
        console.error("Error adding task:", error);
      }
    },

    async deleteItem(itemId) {
      try {
        await deleteDoc(doc(db, "tasks", itemId));
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    },

    async loginUser(data) {
      try {
        return await getUserByEmail(data.email, data.password);
      } catch (error) {
        console.error(error);
      }
    },

    async signupUser(data) {
      try {
        return await createUser(data);
      } catch (error) {
        console.error(error);
      }
    },

    async updateItem(updatedItem) {
      try {
        const itemRef = doc(db, "tasks", updatedItem.id);
        await updateDoc(itemRef, { main: updatedItem.main });
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  }
});
