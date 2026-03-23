import style from './target.module.css'
const TargetCard = ({name, photo, select})=>{
    return(
        <div className={style.card}
        onClick={()=>{select(name)}}>
            {name}
        </div>
    )
}
export{
    TargetCard
}