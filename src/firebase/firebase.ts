import Register from "../types/Register";
import IClient from "../types/IRegister";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  deleteDoc,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const clientsRef = collection(db, "clientes");

export default class registerService implements IClient {
  //https://firebase.google.com/docs/firestore/manage-data/add-data#custom_objects
  myConverter = {
    toFirestore(resident: Register) {
      return {
        name: resident.name,
        age: resident.age,
      };
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ): Register {
      const data = snapshot.data(options);
      return new Register(data.name, data.age, snapshot.id);
    },
  };
  //https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document
  async save(resident: Register): Promise<Register | undefined> {
    if (resident?.id) {
      const docRef = doc(db, "clientes", resident.id).withConverter(
        this.myConverter
      );
      await setDoc(docRef, resident);
      // await this.getConvertedResidents().doc(resident.id).set(resident);
      return resident;
    } else {
      const docRef = await addDoc(this.getConvertedResidents(), resident);
      const doc = await getDoc(docRef);
      return doc.data();
    }
  }
  //https://firebase.google.com/docs/firestore/manage-data/delete-data
  async delete(resident: Register): Promise<void> {
    const docRef = doc(db, "clientes", resident.id);
    return await deleteDoc(docRef);
  }
  //https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection
  async getResidents(): Promise<Register[]> {
    const docs = this.getConvertedResidents();
    const snapDocs = await getDocs(docs);
    return snapDocs.docs.map((doc) => doc.data()) ?? [];
  }

  private getConvertedResidents() {
    return clientsRef.withConverter(this.myConverter);
  }
}
