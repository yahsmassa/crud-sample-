import { useEffect, useState } from "react";
import registerService from "../firebase/firebase";
import MyButton from "../components/MyButton";
import MyForm from "../components/MyForm";
import Layout from "../components/Layout";
import MyList from "../components/MyList";
import Register from "../core/Register";
import IRegister from "../core/IRegister";
import useRegister from "../hooks/useRegister";
import useShowListForm from "../hooks/useShowListForm";

export default function Home() {
  const {
    newResident: novoCliente,
    selectResident: selectClient,
    deleteResident: deleteClient,
    saveResident: saveCliente,
    resident: cliente,
    residents: clientes,
    listVisible: tableVisible,
    showList: seeTable,
  } = useRegister();

  return (
    <div
      className={`
    flex h-screen justify-center items-center
    bg-gradient-to-r from-cyan-400 to-blue-500
    font-bold font-myfont
    `}
    >
      <Layout title="FireStore CRUD Sample">
        {tableVisible ? (
          <>
            <div className="flex justify-end">
              <MyButton
                onClick={novoCliente}
                cor="green"
                className="hover:bg-green-500 hover:border-green-500 border-green-500 text-green-600"
              >
                Enter Data
              </MyButton>
            </div>
            <MyList
              client={clientes}
              clientSelect={selectClient}
              clientDelete={deleteClient}
            ></MyList>
          </>
        ) : (
          <MyForm
            client={cliente}
            cancel={seeTable}
            clientChange={saveCliente}
          />
        )}
      </Layout>
    </div>
  );
}
