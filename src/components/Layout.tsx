import MyTitle from "./MyTitle";

interface LayoutProps {
  title: string;
  children: any;
}

export default function Layout(props: LayoutProps) {
  return (
    <div
      className={`
        flex flex-col bg-blue-50 text-gray-700
        rounded-md
        `}
    >
      <MyTitle>{props.title}</MyTitle>
      <div className="p-6">{props.children}</div>
    </div>
  );
}
