import "./App.css";
import AdminDashboard from "./components/AdminDashboard";
import UserForm from "./components/UserForm";

function App() {
  return (
    <>
      <div>
        <h1 className="text-center mt-3 text-xl">Social Media Submission App</h1>
        <UserForm />
        <AdminDashboard />
      </div>
    </>
  );
}

export default App;
