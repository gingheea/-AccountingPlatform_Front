import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {Navbar1} from "./Navbar1.jsx";
import {Footer1} from "./Footer1.jsx";


export default function PublicLayout() {
    const { pathname } = useLocation()

    return (
        <>
            <Navbar1 />

            {/*
              key={pathname} makes React recreate this block on navigation,
              so the entrance animation plays again.
              Entrance only, no exit animation: otherwise the new page would
              wait for the old one to fade and the transition would feel slow.
            */}
            <motion.main
                key={pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
            >
                <Outlet />
            </motion.main>

            <Footer1 />
        </>
    )
}
