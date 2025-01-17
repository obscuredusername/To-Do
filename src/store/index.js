import { defineStore } from 'pinia';

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    listData: [
      { id: 456, title: "Morning Routine", category: "To-Do", main: { "ops": [ { "insert": "Heaidng 1" }, { "attributes": { "header": 1 }, "insert": "\n" }, { "insert": "here we go" }, { "attributes": { "header": 2 }, "insert": "\n" }, { "attributes": { "bold": true }, "insert": "lets talk normal because its testing stuff etc" }, { "insert": "\n" } ] }, },
      { id: 789, title: "Important Task", category: "To-Do", main: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { id: 234, title: "Finish Homework", category: "To-Do", main: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
      { id: 567, title: "Plan Tomorrow", category: "To-Do", main: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." },
      { id: 678, title: "Workout Session", category: "Reminder", main: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
      { id: 890, title: "Buy Groceries", category: "Reminder", main: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas." },
      { id: 345, title: "Team Meeting", category: "Reminder", main: "Aliquam erat volutpat. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam." },
      { id: 912, title: "Pick Up Package", category: "Reminder", main: "Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum." },
      { id: 1234, title: "Doctor's Appointment", category: "Reminder", main: "Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh." },
      { id: 5678, title: "Reflect on Day", category: "Paragraph", main: "Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus." },
      { id: 2345, title: "Gratitude Journal", category: "Paragraph", main: "Suspendisse potenti. Donec dignissim magna a arcu. Ut sit amet felis volutpat, egestas lorem a, suscipit ante." },
      { id: 6789, title: "Travel Thoughts", category: "Paragraph", main: "Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue." },
      { id: 3456, title: "Personal Reflections", category: "Paragraph", main: "Vestibulum eu odio. Ut ultricies ultrices libero. Integer euismod, nisl sit amet auctor aliquam." },
      { id: 7890, title: "Inspirational Quotes", category: "Paragraph", main: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula suscipit dui." }
    ],
    categories: [
      { category: 'To-Do', icon: "mdi-list-box-outline" },
      { category: 'Paragraph', icon: "mdi-menu" },
      { category: 'Reminder', icon: "mdi-refresh" }
    ] 
  }),

  getters: {
    getCategory(state){
      return state.categories
    },
    getItemsByCategoryWithoutMain:(state)=>(category) => {
      console.log('thiss')
      return state.listData.filter(item => item.category === category).map(item => ({id:item.id, title: item.title}))
    },
    getItems: (state) => (id) => {
      console.log('thiss')
      const result = state.listData.filter(item => item.id === id);
      if (result.length === 0) {
        console.warn(`Item with id ${id} not found in the store.`);
      }
      return result;
    }  
  },

  actions: {
    addItem(newItem) {
      this.listData.push(newItem);
    },
    deleteItem(itemId) {
      this.listData = this.listData.filter(item => item.id !== itemId);
    },
    updateItem(updatedItem) {
      console.log('yesssss')
      const itemIndex = this.listData.findIndex(item => item.id === updatedItem.id);
      if (itemIndex !== -1) {
        this.listData[itemIndex].main = updatedItem.main; // Update the content
      } else {
        console.warn(`Item with id ${updatedItem.id} not found for update.`);
      }
    }
  }
});
