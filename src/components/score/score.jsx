import style from './score.module.css'

const formatTime = (ms)=>{
    const rawSeconds = Math.floor(ms / 1000);

    const minutes = Math.floor(rawSeconds /60);
    const seconds = rawSeconds % 60; 
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');

    return `${paddedMinutes}:${paddedSeconds}`
}
const populateScore = (data)=>{
    console.log(data)
    if(!data) return
    return data.map(session =>{
        return<tr><td>{session.name}</td><td>{formatTime(session.time)}</td></tr>
    })
  

}
const ScoreBoard =({scorsArray})=>{
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