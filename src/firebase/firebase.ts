// Import the functions you need from the SDKs you need

// export const registerNewMedicalRecord = async (
//   newMedicalRecord: MedicalModel
// ) => {
//   try {
//     await addDoc(collectionRef, newMedicalRecord);
//       "Good work!",
//       "The medical record was successfully registered",
//       "success"
//     );
//   } catch (error) {
//   }
// };

// export const deleteMedicalRecord = async (id: string) => {
//   try {
//     const docRef = doc(db, collectionName, id);
//     await deleteDoc(docRef);
//   } catch (error) {
//   }
// };

// export const editMedicalRecord = async (
//   editMedicalRecord: MedicalModel,
//   id: string
// ) => {
//   try {
//     const docRef = doc(db, collectionName, id);
//     await updateDoc(docRef, { ...editMedicalRecord });
//   } catch (error) {
//   }
// };

// export const getMedicalRecords = async (q: Query<DocumentData>) => {
//   try {
//     const querySnapshot = await getDocs(q);
//     return querySnapshot.docs.map(
//       (doc: QueryDocumentSnapshot<DocumentData>) =>
//         ({
//           id: doc.id,
//           ...doc.data(),
//         } as MedicalModel)
//     );
//   } catch (error) {
//     return [];
//   }
// };

import Register from "../core/Register";
import IClient from "../core/IRegister";
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

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

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
export const collectionRef = collection(db, "clientes");

export default class registerService implements IClient {
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

  async delete(resident: Register): Promise<void> {
    const docRef = doc(db, "clientes", resident.id);
    return await deleteDoc(docRef);
  }

  async getResidents(): Promise<Register[]> {
    const docs = this.getConvertedResidents();
    const snapDocs = await getDocs(docs);
    return snapDocs.docs.map((doc) => doc.data()) ?? [];
  }

  private getConvertedResidents() {
    return collectionRef.withConverter(this.myConverter);
  }
}
