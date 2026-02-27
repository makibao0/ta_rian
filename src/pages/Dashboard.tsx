import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
  const { user } = useAuth();
  console.log(user);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome {user?.firstName}</h1>
    </div>
  );
}
