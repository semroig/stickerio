import readUserSession from '@/lib/actions'

import Navbar from "@/components/custom/landing/navbar"
import Hero from "@/components/custom/landing/hero"
import Precios from "@/components/custom/landing/precios"
import Colecciones from "@/components/custom/landing/colecciones"
import Mayorista from "@/components/custom/landing/mayorista"
import Footer from "@/components/custom/landing/footer"

export default async function Landing() {
  const { data: sessionData } = await readUserSession();
  return (
    <div>
        <Navbar userSessionData={ sessionData.session } ></Navbar>
        <Hero></Hero>
        <Precios></Precios>
        <Colecciones></Colecciones>
        <Mayorista></Mayorista>
        <Footer></Footer>
    </div>
  )
}
