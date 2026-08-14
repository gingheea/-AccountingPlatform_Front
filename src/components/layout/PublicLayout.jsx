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
              key={pathname} змушує React пересоздати цей блок при переході
              на іншу сторінку — і анімація появи програється заново.
              Тільки поява, без анімації зникнення: інакше нова сторінка
              чекала б, поки зникне стара, і перехід відчувався б повільним.
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
