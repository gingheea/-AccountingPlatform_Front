import { Outlet } from 'react-router-dom'
import {Navbar1} from "./Navbar1.jsx";
import {Footer1} from "./Footer1.jsx";


export default function PublicLayout() {
    return (
        <>
            <Navbar1 />
            <main>
                <Outlet />
            </main>
            <Footer1 />
        </>
    )
}