import style from './load.module.css';
import load from '../../assets/icons/load_icon.svg'
const Loading = () =>{
    return (
        <div className={style.LoadeContainer}>
            <img src={load} alt='Loading...' className={style.loader}></img>
            <h3 className={style.loadText}>Loading ...</h3>
        </div>
    )
}
const ButtonLoading = () =>{
    return(
        <>
            <img src={load} alt='Loading...' className={style.loader}></img>         
        </>
    )
}
export{
    Loading,
    ButtonLoading
}