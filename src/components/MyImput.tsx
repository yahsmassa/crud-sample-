interface MyImputProps {
  text: string;
  type?: "text" | "number";
  value: any;
  className?: string;
  onlyRead?: boolean;
  valueChange?: (value: any) => void;
}

export default function MyImput(props: MyImputProps) {
  return (
    <div className={`flex flex-col ${props.className} `}>
      <label className="mb-2" htmlFor="">
        {props.text}
      </label>
      <input
        onChange={(e) => props.valueChange?.(e.target.value)}
        className={`border border-cyan-300 rounded-lg bg-blue-50 focus:outline-none p-1 ${
          props.onlyRead ? "" : "focus:bg-white"
        } `}
        type={props.type ?? "text"}
        value={props.value}
        readOnly={props.onlyRead}
      />
    </div>
  );
}
