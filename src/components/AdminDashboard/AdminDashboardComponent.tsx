interface Props {
  selectedPage: string;
}

const AdminDashboardComponent = ({ selectedPage }: Props) => {
  return <div className="flex">{selectedPage}</div>;
};

export default AdminDashboardComponent;
