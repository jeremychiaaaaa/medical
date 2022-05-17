// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';


import { doc, getFirestore, getDoc, collection, setDoc, serverTimestamp, updateDoc, runTransaction, addDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANayakCpqO2yVK6wRcmiwW6Py6fSJ0Iqs",
  authDomain: "pokerapp-31381.firebaseapp.com",
  projectId: "pokerapp-31381",
  storageBucket: "pokerapp-31381.appspot.com",
  messagingSenderId: "460924854901",
  appId: "1:460924854901:web:77411d85d9492d633e4e3c",
  measurementId: "G-TW49ZC1TGQ"
};

// Initialize Firebase
let app;
if(firebase.apps.length === 0){
    app= firebase.initializeApp(firebaseConfig);
} else {
    app=firebase.app()
}

export const createUserDocument = async (user,additionalData) => {
  if(!user) return;
  const db=getFirestore()
        const colRef = collection(db, 'trial')
        const uid = user.user.uid
        console.log(uid)
  const userRef = doc(db, 'trial', uid) 
const snapshot = await getDoc(userRef)

if(!snapshot.exists()){
  
  const {country,POR,username} = additionalData

  try {
    setDoc(userRef,{
      country,
      POR ,
      date:[],
      time:[],
      doctor:[],
      type:[],
      username,
      documents:[],
      documentNames:[],
      customDocumentNames:[],
      images:[],
      temp:[]
    })
  } catch(error){
    console.log(error.message)
  }
}
}

export const createAppointment = async (user, additionalData) => {
  if(!user) return;
  const db = getFirestore()
  const colRef = collection(db, 'trial')
  const uid = user.user.uid
  console.log(uid)
  const userRef = doc(db,'trial',uid)
  const {temp} = additionalData
  const snapshot = await getDoc(userRef)
console.log('snapshot is' + snapshot)

  try{
    updateDoc(userRef, {
      temp:arrayUnion(...temp)
    },)
  } catch(error){
    console.log(error.message)
  }
}
  
export const createTravelDocument = async (user, additionalData) => {
  if(!user) return;
  const db = getFirestore()
  const colRef = collection(db, 'trial')
  const uid = user.user.uid
  console.log(uid)
  const userRef = doc(db,'trial',uid)
  const {fileURL,fileName, name} = additionalData
  const snapshot = await getDoc(userRef)

  try{
    updateDoc(userRef, {
       documents:arrayUnion(fileURL),
       documentNames:arrayUnion(fileName),
       customDocumentNames: arrayUnion(name)
    })
  } catch(error){
    console.log(error.message)
  }
}

export const getAppointment = async (user) => {
  if(!user) return;
  const db = getFirestore()
  const colRef = collection(db, 'trial')
  const uid = user.user.uid
  console.log(uid)
  const userRef = doc(db,'trial',uid)
  
  try {
    const docsnap = await getDoc(userRef)

    console.log(docsnap.data())
    console.log('Got data')
    return docsnap
  } catch (error) {
    console.log(error.message)
  }

}
export const getTravelDocument = async (user) => {
  if(!user) return;
  const db = getFirestore()
  const colRef = collection(db, 'trial')
  const uid = user.user.uid
  console.log(uid)
  const userRef = doc(db,'trial',uid)
  
  try {
    const docsnap = await getDoc(userRef)

    console.log(docsnap.data())
    console.log('Got data')
    return docsnap
  } catch (error) {
    console.log(error.message)
  }


}

export const deleteTravelDoc = async (user, additionalData) => {
  if(!user) return;

  const db = getFirestore()
  const colRef = collection(db, 'trial')
  const uid = user.user.uid
  console.log(uid)
  const userRef = doc(db,'trial',uid)
  const {deletedFileName, deletedFileURL, deletedCustomName} = additionalData
  try{
    updateDoc(userRef, {
      documents:arrayRemove(deletedFileURL),
      documentNames:arrayRemove(deletedFileName),

      createdAt:serverTimestamp(),
    })
  } catch(error){
    console.log(error.message)
  }
}

export const deleteAppointment = async (user, additionalData) => {
  if(!user) return;

  const db = getFirestore()
  const colRef = collection(db, 'trial')
  const uid = user.user.uid
  console.log(uid)
  const userRef = doc(db,'trial',uid)
  const {deletedType,deletedDate,deletedDoctor, deletedTime,deletedImages} = additionalData
  try{
    updateDoc(userRef, {
        date: arrayRemove(deletedDate),
      time:arrayRemove(deletedTime),
      doctor:arrayRemove(deletedDoctor),
      type:arrayRemove(deletedType),
      images:arrayRemove(deletedImages),
      createdAt:serverTimestamp(),
    })
  } catch(error){
    console.log(error.message)
  }
}
export default firebase