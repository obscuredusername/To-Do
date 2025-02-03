import { initializeApp } from 'firebase/app'
import { 
  getFirestore, collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, where, onSnapshot 
} from 'firebase/firestore'
import { ref, onUnmounted } from 'vue'

// Firebase config
const config = {
  apiKey: "AIzaSyCviTSPeijKEhaSI0KIVxjnqWjE08AzI-8",
  authDomain: "to-do-list-e8bac.firebaseapp.com",
  projectId: "to-do-list-e8bac",
  storageBucket: "to-do-list-e8bac.firebasestorage.app",
  messagingSenderId: "553171650663",
  appId: "1:553171650663:web:e784b17eb627811b53ecc2",
  measurementId: "G-DZJK22DV5S"
}

// Initialize Firebase
const firebaseApp = initializeApp(config)
export const db = getFirestore(firebaseApp)
const usersCollection = collection(db, 'users')
const notesCollection = collection(db, 'notes')
const categoryCollection = collection(db, 'category')

// CRUD Operations
export const createUser = user => addDoc(usersCollection, user)
export const createNote = notes => addDoc(notesCollection, notes)


export const getUserByEmail = async (email,password) => {
  const q = query(usersCollection, where('email', '==', email, ))
  const querySnapshot = await getDocs(q)
  if (querySnapshot.empty){
    return "No User Found"
  }
  const userData = querySnapshot.docs[0].data()

  if(userData.password === password) {
    return {id: querySnapshot.docs[0].id, ...userData}
  } else {
    return "Wrong Password"
  }
}

export const getCategory = async (userID) => {
  try {
    const userRef = doc(categoryCollection.firestore, 'users', userID);

    const q = query(categoryCollection, where('userID', '==', userRef));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return []; 
    }
    console.log(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching notes:", error);
    return null;
  }
};

export const getNotes = async (userID) => {
  try {
    const userRef = doc(notesCollection.firestore, 'users', userID);
    const q = query(notesCollection, where('userID', '==', userRef));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return []; 
    }
    console.log(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching notes:", error);
    return null;
  }
};

export const updateUser = (id, user) => updateDoc(doc(usersCollection, id), user)

export const deleteUser = id => deleteDoc(doc(usersCollection, id))

export const useLoadUsers = () => {
  const users = ref([])
  const unsubscribe = onSnapshot(usersCollection, snapshot => {
    users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(unsubscribe)
  return users
}
