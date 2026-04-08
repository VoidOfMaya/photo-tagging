import { useEffect, useRef } from "react"
import style from './dlg.module.css'
import { scoreBoard } from "../score/score"

const GameStart =({ref, start})=>{
    return(
        <dialog ref={ref} className={style.dlg}>

            <h2 style={{gridArea: 'title'}}>wheres waldo? </h2>
            <scoreBoard style={{gridArea: 'score'}}/>
            <div style={{gridArea: 'rules', fontSize: '12px'}}>
                <p>- you must find the following characters in a timely manner (waldo, wanda, odlaw, mermaid)</p>
                <p>- to end game please make sure to  click on the "end game" button that will pop-up once all targets are found</p>
                <p>- if all targets are found you will be returned to this window to view the score board</p>
            </div>
            <div style={{gridArea: 'start'}}>
                <form>
                    <label for="playername">player name:</label>
                    <input name="playername" id="playername" placeholder="name goes here!"></input>
                    <button type="button"
                    onClick={()=>start()}>start Game!</button>                
                </form>
                <h6>field is not required. no name = player is annonymous</h6>                
            </div>


            
        </dialog>
    )
}
export{
    GameStart
}