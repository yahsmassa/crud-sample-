import Register from "../types/Register";
import { IconEdit, IconGarbage } from "./Icons";

interface IListProps {
  client: Register[];
  clientSelect?: (client: Register) => void;
  clientDelete?: (client: Register) => void;
}

export default function showList(props: IListProps) {
  const showEdit = props.clientSelect || props.clientDelete;

  function renderHead() {
    return (
      <tr>
        <th className="text-left p-4 hidden md:flex">Code</th>
        <th className="text-left p-4">Name</th>
        <th className="text-left p-4">Age</th>
        {showEdit ? <th className=" p-4">Edit</th> : false}
      </tr>
    );
  }

  function renderRow() {
    return props.client?.map((client, i) => {
      return (
        <tr
          key={client.id}
          className={`${
            i % 2 === 0 ? "bg-blue-100" : "bg-blue-200"
          } table-auto`}
        >
          <td className="text-left p-2 hidden md:flex">{client.id}</td>
          <td className="text-left p-2">{client.name}</td>
          <td className="text-left p-2">{client.age}</td>
          {showEdit ? renderAlterIcons(client) : false}
        </tr>
      );
    });
  }

  function renderAlterIcons(client: Register) {
    return (
      <td className="flex justify-center ">
        {props.clientSelect ? (
          <button
            onClick={() => props.clientSelect?.(client)}
            className="flex justify-center items-center p-2 m-1 rounded-full text-zinc-400 hover:text-green-600 hover:bg-white "
          >
            {IconEdit}
          </button>
        ) : (
          false
        )}
        {props.clientDelete ? (
          <button
            onClick={() => props.clientDelete?.(client)}
            className="flex justify-center items-center p-2 m-1 rounded-full text-zinc-400  hover:text-red-600 hover:bg-white"
          >
            {IconGarbage}
          </button>
        ) : (
          false
        )}
      </td>
    );
  }

  return (
    <table className="w-full rounded-xl overflow-hidden table-auto">
      <thead
        className={`
                bg-gradient-to-r from-blue-500 to-blue-400 text-gray-100
            `}
      >
        {renderHead()}
      </thead>
      <tbody>{renderRow()}</tbody>
    </table>
  );
}
