import firebase from "../config";
import Register from "../../core/Register";
import IClient from "../../core/IRegister";

export default class registerService implements IClient {
  myConverter = {
    toFirestore(resident: Register) {
      return {
        name: resident.name,
        age: resident.age,
      };
    },
    fromFirestore(
      snapshot: firebase.firestore.QueryDocumentSnapshot,
      options: firebase.firestore.SnapshotOptions
    ): Register {
      const data = snapshot.data(options);
      return new Register(data.name, data.age, snapshot.id);
    },
  };

  async save(resident: Register): Promise<Register | undefined> {
    if (resident?.id) {
      await this.getConvertedResidents().doc(resident.id).set(resident);
      return resident;
    } else {
      const docRef = await this.getConvertedResidents().add(resident);
      const doc = await docRef.get();
      return doc.data();
    }
  }

  async delete(resident: Register): Promise<void> {
    return this.getConvertedResidents().doc(resident.id).delete();
  }

  async getResidents(): Promise<Register[]> {
    const query = await this.getConvertedResidents().get();
    return query.docs.map((doc) => doc.data()) ?? [];
  }

  private getConvertedResidents() {
    return firebase
      .firestore()
      .collection("clientes")
      .withConverter(this.myConverter);
  }
}
