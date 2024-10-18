// pages/admin/support.tsx
import Sidebar from '../../components/admin/Sidebar';

const SupportPage = () => {
  const supportTickets = [
    { id: 1, user: "John Doe", issue: "Unable to withdraw funds", status: "Open" },
    { id: 2, user: "Jane Doe", issue: "Account locked", status: "Resolved" },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10">
        <h2 className="text-2xl font-bold mb-4">Customer Support</h2>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Issue</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {supportTickets.map(ticket => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.user}</td>
                <td>{ticket.issue}</td>
                <td>{ticket.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupportPage;
