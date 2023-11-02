import UpperSearch from "@/app/screens/collections/UpperSearch"
import Menu from "../../screens/collections/Menu"
import clsx from "clsx"
import appActions from "@/mobX/store/appActions"
import { observer } from "mobx-react"
import AddNote from "../AddNote"
import Head from "next/head"

export const BasicLayout = observer(({
  children,
}: {
  children: React.ReactNode
}) => {

  function openMenu() {
    appActions.changeIsMenuOpenState()
  }

  return (
    <>
      <Head>
      <title>Poogle Keep</title>
      <link rel="icon" href="/favicon" />
    </Head>
    <div>
      <UpperSearch menuOpenAction={openMenu} />
      <div className='flex '>
        <Menu isMenuOpen={appActions.isMenuOpen}/>
        <div className={clsx("ml-[14vw] flex flex-col w-full", {'ml-[22vw]': appActions.isMenuOpen})}>
          {children}
        </div>
      </div>

    </div>
    </>
  )
})
