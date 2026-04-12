
import levelOne from '../../assets/photos/Waldo-Underground.jpg'
import style from './home.module.css'
import { useEffect, useRef, useState } from 'react'
import { GameStart } from '../startDialog/dialog.jsx'
import { TargetCard } from '../targetList/targets.jsx'
//import photo
import waldo from '../../assets/photos/waldo.jpg'
import wenda from '../../assets/photos/wenda.jpg'
import odlaw from '../../assets/photos/odlaw.jpg'
import { Dropdown } from '../dropdown/dropdown.jsx'
import { ButtonLoading } from '../loading/load.jsx'

const initialTargets = [
    { name: 'waldo', photo: waldo, isSelected: false, coords: { x: null, y: null } },
    { name: 'wanda', photo: wenda, isSelected: false, coords: { x: null, y: null } },
    { name: 'odlaw', photo: odlaw, isSelected: false, coords: { x: null, y: null } },
    { name: 'mermaid', photo: null, isSelected: false, coords: { x: null, y: null } }
];

const initialData = {
    currentTX: 0,
    currentTY: 0,
    currentSX: 0,
    currentSY: 0,
    targetName: null,
    playerName: null,
    position: { x: null, y: null }
};

const Home =()=>{
    //refs
    const imgRef = useRef(null);
    const pRef = useRef({T:{X: null,Y:null},S:{W:null,H:null}})
    const modalRef = useRef(null);
    //states
    const [targets, setTargets] = useState(initialTargets)
    const [target, setTarget] = useState(false);
    const [data, setData]= useState(initialData)
    const [session, setSession]= useState(null);
    const[score, setScore]= useState(null);
    const[isEnd, setIsEnd] = useState(false);

    //functions
    const getScore =()=>{
        fetch(`${import.meta.env.VITE_API_URL}`)
        .then(response=>{
            if(response.status >=400) throw new Error('Something whent wrong: ' + response)
            return response.json();    
        })
        .then(data=>{
            setScore(data)
        })
        .catch(error => {throw new Error(error)})      
    }
    const setTargetName = (name)=>{
        setData(prev =>({ 
                ...prev,  
                targetName: name,
            })
        )      
    }
    const selectTarget =(name, position)=>{
        //select target name
        if (!target) return
        setTargets(prev =>
            prev.map(t =>{
                if(t.name === name){
                    return{
                        ...t,
                        isSelected: true,
                        coords: {
                            x: data.position.X,
                            y: data.position.Y
                        }
                    }
                }
                return t;
            })
        )
        //input target coords based on that name
        //
    }
    const selectHandler=(e)=>{
        const img = imgRef.current.getBoundingClientRect();

        const x = e.clientX;
        const y = e.clientY;
        
        pRef.current = {
            T:{
                X: x-img.left, 
                Y: y-img.top
            },
            S:{
                W:img.width,
                H:img.height
            }
        }

        setData(prev =>({ 
                ...prev,  
                currentTX: x - img.left,
                currentTY: y - img.top,
                currentSX: img.width,
                currentSY: img.height, 
                position: {X: pRef.current.T.X, Y:pRef.current.T.Y}
            })
        )
        setTarget(true)
    }
    const populateTargets = (targets)=>{
        return targets.map ((t, i) =>{
            return(
                <TargetCard target={t} setData={setTargetName} key={i}/>
            )
        })
    }
    const startSession = async(data)=>{

        const res = await fetch(`${import.meta.env.VITE_API_URL}`,{
            method: 'POST',
            headers:{ 'Content-Type': 'application/json' },
            body:JSON.stringify(data),
        });
        const result = await res.json();
        if(!result) return;
        setSession(result);
        console.log(session);

    }
    const outboundData = async()=>{
        if(!session) return
        //target format: example=>{"targetId": "waldo", "x": 2214,"y": 649}
        const formattedTargs = targets.map(t =>({
            targetId: t.name,
            x: t.coords.x,
            y: t.coords.y
        }))
        const outbound ={
            playerId: session.id,
            mapId: session.mapId,
            screensize: {W: data.currentSX,H:data.currentSY},
            targets: formattedTargs
        }
        console.log(outbound)
        endGame(outbound);
        
    }
    const endGame =async (payload) =>{
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}`,{
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload)
            })
            if(!response.ok){
                const msg = await response.text();

                setIsEnd(false)
                setTargets(initialTargets);  
                throw new Error(`Error ${response.status}: ${msg}`)  
                               
            }else{
                alert('all characters have been found!')
                resetGame();
            }
            return response.json();    
            
        }catch(err){
            alert(err.message)
            console.log(err.message)
        }
    }
    const resetGame =()=>{
        setTargets(initialTargets);
        setData(initialData);
        setTarget(false);
        setSession(null);
        setIsEnd(false)
        setScore(null)
        getScore()
        pRef.current = { T: { X: null, Y: null }, S: { W: null, H: null } };
    }
    const isGameFinished = targets.every(t=> t.isSelected);
    //manages screen sizing
    useEffect(()=>{
        const updateSize=()=>{

            if(!imgRef.current && !pRef.current.T.X)return;
            const img =imgRef.current.getBoundingClientRect();
            pRef.current = {
                T:{
                    // X:pRef.current.T.X/pRef.current.S.W * img.width
                    // Y:pRef.current.T.Y/pRef.current.S.H  * img.height 
                    X:pRef.current.T.X/pRef.current.S.W * img.width ,
                    Y:pRef.current.T.Y/pRef.current.S.H  * img.height 
                },
                S:{
                    W:img.width,
                    H:img.height
                }
            }
            setData(prev=>({
                ...prev,
                currentSX: img.width,
                currentSY: img.height,
                position:{ 
                    X:  pRef.current.T.X , 
                    Y:  pRef.current.T.Y 
                }
            })) 
            if(data.position.X !== null) setTarget(true);
        };
        updateSize()
        window.addEventListener('resize',updateSize);
        return ()=> window.removeEventListener('resize',updateSize);
    },[])
    //manages dialog display
    useEffect(()=>{
        const dialog = modalRef.current;
        if (!dialog) return;
        if(!session&& !dialog.open){
            dialog.showModal() 
        }else if(session && dialog.open){
            dialog.close(); 
        }
    },[session])
    //manages score fetching
    useEffect(()=>{
        try{
            getScore()
        }catch(err){
            console.log(err.message)
        }
    },[])
    return(
        <>
            <div className={style.waldoContainer}> 
               {session?(
                ''
               ):(
                <GameStart
                    start={startSession} 
                    score={score} 
                    ref={modalRef} 
                    />                
               )}  
                <img  
                    ref={imgRef}  
                    src={levelOne}
                    className={style.photoCanvas}    
                    onClick={e=>{selectHandler(e)}}
                ></img>
                <p style={{fontSize: '12px', color: 'gray', margin: 0}}>
                    Target:[N: {data.targetName} || X:{data.position.X} || Y:{data.position.Y}] 
                    Screen:[W:{data.currentSX} || H:{data.currentSY}]  
                </p>
                {session?(            
                    <div style={{width: '50px',
                                height: '50px',
                                border: `2px solid red`,
                                borderRadius: '25px',
                                position: 'absolute',
                                left: `${data.position.X - 53/2}px`,
                                top: `${data.position.Y - 53/2}px`,
                                }}>
                    <Dropdown position={data.position}
                              targets={targets}
                              selectTarget={selectTarget}
                     />
                    </div>              
                ):(
                    <></>
                )}
                <section style={{display: 'flex', flexDirection: "column"}}>
                    <p style={{alignSelf: 'center'}}>targets to find: blue means target is set </p>
                    <div className={style.targetContainer}>
                        
                        {populateTargets(targets)}
                    </div>
                    <button type='button' style={{padding: '10px'}}
                            disabled={!isGameFinished}
                            onClick={()=>{
                                setIsEnd(!isEnd);
                                outboundData();
                            }}
                    >{!isGameFinished? ('round in session!'): !isEnd?('end game!'):(<ButtonLoading />)}</button>
                </section>
            </div>
        </>
    )
}
export{
   Home
}