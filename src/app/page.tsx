import {redirect} from "next/navigation"
const HomePage = ()=>{
  return<div>
    {redirect("/admin/dashboard")}
  <h1>Home page</h1>
  </div>
}

export default HomePage;