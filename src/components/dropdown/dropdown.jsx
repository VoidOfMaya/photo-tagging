import style from './dropdown.module.css'
const Dropdown=({targets, position, selectTarget})=>{
    const dropSelect =(arr)=>{
        return arr.map((target, i) => {
            const name = target
            return(
                <div key={i} 
                className={style.opts}
                onClick={()=>selectTarget(name)}>{name}</div>
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