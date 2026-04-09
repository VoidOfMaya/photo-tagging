import style from './target.module.css'
const TargetCard = ({target, setData})=>{
    return(
        <div style={{padding: '10px'}}
        className={ `${style.base}
            ${target.isSelected?(style.found):(style.notFound)}`}
        onClick={()=> setData(target.name)}>
            <img src={target.photo} 
                 alt={target.name} 
                 width='100px'
                 className={style.photo}>
            </img>
            <div>x:{target.coords.x}</div>
            <div>x:{target.coords.y}</div>
  
        </div>
    )
}
export{
    TargetCard
}