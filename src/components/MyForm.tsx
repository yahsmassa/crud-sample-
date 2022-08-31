import { useState } from "react";
import Register from "../types/Register";
import MyButton from "./MyButton";
import MyImput from "./MyImput";

interface FormatProps {
  client: Register;
  clientChange?: (cliente: Register) => void;
  cancel?: () => void;
}

export default function Format(props: FormatProps) {
  const id = props.client?.id;
  const [name, setName] = useState(props.client?.name ?? "");
  const [age, setAge] = useState(props.client?.age ?? 0);

  return (
    <div>
      {id ? (
        <MyImput onlyRead text="code" value={id} className="mb-5" />
      ) : (
        false
      )}

      <MyImput
        text="Name"
        value={name}
        valueChange={setName}
        className="mb-5"
      />

      <MyImput text="Age" type="number" value={age} valueChange={setAge} />

      <div className=" flex justify-end mt-3">
        <MyButton
          onClick={() => props.clientChange?.(new Register(name, age, id))}
          cor="blue"
          className="mr-2 hover:bg-blue-400 hover:border-blue-400 border-blue-400 text-blue-400 "
        >
          {id ? "Alter" : "Save"}
        </MyButton>
        <MyButton
          onClick={props.cancel}
          cor="gray"
          className="mr-2 hover:bg-gray-400 hover:border-gray-400 border-gray-400 text-gray-400"
        >
          Cancel
        </MyButton>
      </div>
    </div>
  );
}
