interface IProps {
  children: React.ReactNode;
}

function Templates({ children }: IProps) {
  return <div>{children}</div>;
}

export default Templates;
