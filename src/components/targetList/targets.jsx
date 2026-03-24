import style from './target.module.css'
const TargetCard = ({target})=>{
    return(
        <div style={{padding: '10px'}}
        className={
            target.isSelected?(style.found):(style.notFound)
        }
        onClick={()=>{select(target.name)}}>
            {target.name}
        </div>
    )
}
export{
    TargetCard
}