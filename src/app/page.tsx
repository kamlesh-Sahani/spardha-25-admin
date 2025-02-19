import { redirect } from "next/navigation";
const HomePage = () => {
  return (
    <div className="h-[100vh]">
      {redirect("/admin/dashboard")}
      <h1>Home page</h1>
    </div>
  );
};

export default HomePage;
