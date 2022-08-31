//Split Substitute ( see  ../components/index.ts )
import { MyButton, MyForm, Layout, MyList } from "../components";
import useRegister from "../hooks/useRegister";

export default function Home() {
  const {
    newResident: newClient,
    selectResident: selectClient,
    deleteResident: deleteClient,
    saveResident: saveClient,
    resident: cliente,
    residents: clientes,
    listVisible: tableVisible,
    showList: seeTable,
  } = useRegister();

  return (
    <div
      className={`
    flex h-screen justify-center
    font-bold font-myfont pt-10 bg-blue-50
    `}
    >
      <Layout title="FireStore CRUD Sample">
        {tableVisible ? (
          <>
            <div className="flex justify-end">
              <MyButton
                onClick={newClient}
                cor="green"
                className="hover:bg-blue-500 hover:border-blue-500 border-blue-500 text-blue-600"
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
            clientChange={saveClient}
          />
        )}
      </Layout>
    </div>
  );
}
