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

const firebaseConfig = {
  apiKey: "AIzaSyBrDW_geNUSQ_xwJx95jjHbBnkNBpzvsSw",
  authDomain: "vue-axios-30475.firebaseapp.com",
  projectId: "vue-axios-30475",
  storageBucket: "vue-axios-30475.appspot.com",
  messagingSenderId: "901277628208",
  appId: "1:901277628208:web:f538fe236ffdb945e07af5",
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
