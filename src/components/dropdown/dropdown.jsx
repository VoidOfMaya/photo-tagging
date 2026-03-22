import style from './dropdown.module.css'
const Dropdown=({targets, position})=>{
    const dropSelect =(arr)=>{
        return arr.map((target, i) => {
            const name = target
            return(
                <div style={{marginTop: '1opx'}} key={i}>{name}</div>
            )
        });
    }
    
    return(
        <div className={style.drop}
             style={{position: 'absolute',
                     left: `${position.x}px`,
                     top: `${position.y}px`}}>
            {dropSelect(targets)}
        </div>
    )
}
export{
    Dropdown
}