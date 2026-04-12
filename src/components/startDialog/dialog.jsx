import { useEffect, useRef, useState } from "react"
import style from './dlg.module.css'
import { ScoreBoard } from "../score/score"
import { ButtonLoading } from "../loading/load"

const GameStart =({ref,score, start})=>{
    const [click, setClick] = useState(false);
    const formData = (e)=>{
        e.preventDefault();
        const playerName = new FormData(e.target);
        const data = {playername: playerName.get("playername")|| '--Anon--', mapId: 1}
        start(data);
    }
    return(
        <dialog ref={ref} className={style.dlg}>

            <h2 style={{gridArea: 'title', justifySelf: 'center'}}>wheres waldo? </h2>
            <div style={{gridArea: 'score', overflowY: 'auto',padding: '10px'}}>
                <table style={{position: 'sticky',top: 0}}>
                    <thead style={{height: '10%', textAlign: 'left'}}>
                        <tr>
                            <th style={{width: "50%"}}>Player</th>
                            <th style={{width: "50%"}}>Time</th>
                        </tr>
                    </thead>
                </table>
                <ScoreBoard scorsArray={score}/>                
            </div>

            <div style={{gridArea: 'rules', fontSize: '12px'}}>
                <p>- you must find the following characters in a timely manner (waldo, wanda, odlaw, mermaid)</p>
                <p>- to end game please make sure to  click on the "end game" button that will pop-up once all targets are found</p>
                <p>- if all targets are found you will be returned to this window to view the score board</p>
            </div>
            <div style={{gridArea: 'start',justifySelf: 'center'}}>
                <form onSubmit={formData}>
                    <label htmlFor="playername">player name:</label>
                    <input name="playername" id="playername" placeholder="name goes here!"></input>
                    <button type="submit" onClick={()=>setClick(!click)} > Start Game</button>              
                </form>
                <h6 style={{textAlign: 'center'}}>field is not required. no name = player is annonymous</h6>                
            </div>
            <div style={{gridArea: 'loader',display: 'flex', justifyContent: 'center'}}>
                {!click?(''):(
                    <ButtonLoading />
                )}                 
            </div>
  
        </dialog>
    )
}
export{
    GameStart
}