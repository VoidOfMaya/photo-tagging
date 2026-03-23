import { useEffect, useRef } from "react"
import style from './dlg.module.css'

const GameStart =({ref, start})=>{
    return(
        <dialog ref={ref} className={style.dlg}>
            <p style={{maxWidth: window.innerWidth/2}}>
                    waldo seems to have lost his way and stumbled  on to a raging battle
                    inside a dungeon filled with dragons, along side waldo wenda and odlaw 
                    seem to have been caught  up in the same mess, please find and rescue them!

            </p>
            <button type="button"
            onClick={()=>start()}>start!</button>
        </dialog>
    )
}
export{
    GameStart
}