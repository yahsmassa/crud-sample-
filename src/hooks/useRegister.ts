import { useEffect, useState } from "react";
import RegisterService from "../firebase/firebase";
import Register from "../types/Register";
import IRegister from "../types/IRegister";
import useShowListForm from "./useShowListForm";

export default function useRegister() {
  const registerRec: IRegister = new RegisterService();

  const [resident, setResident] = useState<Register>(Register.initRegister);
  const [residents, setResidents] = useState<Register[]>([]);

  useEffect(listResidents, []);

  const { showList, showForm, listVisible, formVisible } = useShowListForm();

  function listResidents() {
    registerRec.getResidents().then((clientes) => {
      setResidents(clientes);
      showList();
    });
  }

  function selectResident(cliente: Register) {
    setResident(cliente);
    showForm();
  }
  async function deleteResident(cliente: Register) {
    await registerRec.delete(cliente);
    listResidents();
  }

  async function saveResident(cliente: Register) {
    await registerRec.save(cliente);
    listResidents();
  }
  function newResident() {
    setResident(Register.initRegister());
    showForm();
  }

  return {
    resident,
    residents,
    saveResident,
    newResident,
    deleteResident,
    selectResident,
    listResidents,
    listVisible,
    showList,
  };
}
