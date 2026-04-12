
import style from './score.module.css'
import { ButtonLoading, Loading } from '../loading/load';

const formatTime = (ms)=>{
    const rawSeconds = Math.floor(ms / 1000);

    const minutes = Math.floor(rawSeconds /60);
    const seconds = rawSeconds % 60; 
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');

    return `${paddedMinutes}:${paddedSeconds}`
}
const populateScore = (data)=>{
    if(!data) return 
    const sorted = [...data].sort((a,b)=> a.time - b.time);
    return sorted.map(session =>{
        return(
        <tr key={session.name}>
            <td style={{width: "50%"}}>{session.name}</td>
            <td style={{width: "50%"}}>{formatTime(session.time)}</td>
        </tr>
            )
    })
}
const ScoreBoard =({scorsArray})=>{
    if(!scorsArray){
        return(
            <div style={{display: 'flex',justifyContent: 'center', marginTop: '5em'}}>
                <ButtonLoading />            
            </div>
        )
    }
    return(
        <div className={style.score}>
            <table>
                <tbody >
                    {populateScore(scorsArray)}
                </tbody>
            </table>

        </div>
    )

}
export{
    ScoreBoard,
}