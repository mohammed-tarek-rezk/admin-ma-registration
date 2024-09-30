import { Route, Routes } from "react-router-dom"
import { MAIN_LINKS } from "../constants"
import Login from "../pages/Login"
import HomePage from "../pages/HomePage"
import ProtectiveRoute from "./ProtectiveRoute"
import AllMemebers from "../components/AllMemebers"
import EditMember from "../components/EditMember"
import SingleMemberPage from "../pages/SingleMemberPage"
import Moderators from "../pages/Moderators"
import ModeratorMembers from "../components/ModeratorMembers"
import Profile from "../pages/Profile"


function MainRoute() {
  return (
    <Routes >
        <Route path={MAIN_LINKS.LOGIN} element={<Login />} />
            <Route path={MAIN_LINKS.HOME} element={<ProtectiveRoute />} >
             <Route path="" element={<HomePage />}/>
             <Route path="all_members" element={<AllMemebers />}/>
             <Route path="member/:id" element={<SingleMemberPage />}/>
             <Route path="moderators" element={<Moderators />}/>
             <Route path="moderators/:id" element={<ModeratorMembers />}/>
             <Route path="profile" element={<Profile />}/>
            </Route>
    </Routes>
  )
}

export default MainRoute