import style from './notfound.module.css'
import { Link } from 'react-router'
const NotFound =()=>{
    return(
        <div className={style.pageContainer}>
        <h1 className={style.title}>Error 404! age not found!</h1>
        <Link to={"/"} className={style.linkTo}>return to home</Link>
        </div>
    )
}
export{
    NotFound,
}