import { useState, useEffect } from 'react'
import ImgFlecha from '../images/flecha.png'
import ImgSocarron from '../images/socarron.png'
import ImgAmor from '../images/amor.png'
import ImgYes from '../images/si.png'

let ganadores = []
function App() {

  const [Participantes, setParticipantes] = useState([])
  const [Ganador, setGanador] = useState([])
  const [Advice, setAdvice] = useState('Esperando participantes...')
  const [Init, setInit] = useState(false)
  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  

  const Start = () =>{
    ganadores = []
    let init = true
    let p = document.getElementById('area').value.split('\n')
    let participantes = []
    for(let i = 0; i < p.length; i++){
      if(p[i] != '' && !participantes.includes(p[i])){
        participantes.push(p[i])
      }
    }
    
    const n_ganadores = parseInt(document.getElementById('n_ganadores').value)
    if(participantes.length > 1 && n_ganadores <= participantes.length){
    
      document.getElementById('img_flecha').classList.add('zoomin')
      document.getElementById('popup').classList.add('toup')
      setTimeout(() => {
        document.getElementById('popup').classList.remove('toup')
      }, 500);
     
      
      
      if(document.getElementById('n_ganadores').value!=''){
        while(init){
          
          const n_r = getRandom(0, participantes.length)
          const winner = participantes[n_r]
          if(!ganadores.includes(winner) &&winner !=''){
            ganadores.push(winner)
          }
          if(ganadores.length==parseInt(n_ganadores)){
            init = false
            setInit(true)
          setGanador(ganadores)
          
          }
        }
      }
      
      setTimeout(() => {
        document.getElementById('img_flecha').classList.remove('zoomin')  
      }, 2000);
        setParticipantes(participantes)
      
  
    }else{
      participantes = []
      setParticipantes([])
      setAdvice('El numero de ganadores no debe exceder a los participantes')
    }
    
  }



  return (
    <div>
      <h1 id='title'>Sorteo</h1>
      <div className='column_center'>

      <div id='primera' className='row_center'>
        <div  id='start' className='column_start'>
          <textarea className='text' id='area'></textarea>
          <div id='div_num_ganadores' className='row_center' >
            <span className='text'>Número de ganadores</span>
            <input id='n_ganadores' className='text' type='number' defaultValue={1}></input>
          </div>
        </div>

        <div id='centerr' className='column_center'>

          <img className='img_pequeña socarron rotate-center' src={ImgSocarron}></img>
          <img  id='img_flecha' className='img_pequeña flecha' src={ImgFlecha}></img>

        </div>

        <div className='column_start'>
          {
            Participantes.length>0 ?
            <h3 className='subtext'>Participantes</h3>
            :
            <div id='advice'><h3 className='subtext'>{Advice}</h3></div>
          }
          
        {
        Participantes.map((participante,index)=>{
          return <div>
            <span className='text'>{participante}</span>
            </div>
        })
      }
        </div>
      </div>

      <div id='row_center'>
        <img src={ImgYes} id='popup' className='img_pequeña'></img>
        <br></br>
        <button onClick={()=> Start()}>iniciar</button>
      </div>
      </div>
   
      {
        Init &&   <div className='row_center'>
        <div className='img_grande'>
          <img className='img_grande shaker' src={ImgAmor}></img>
        </div>
    
        <div id='ganador'>
          {
            Ganador.length==1 ? <h2 className='subtext'>Ganador</h2>:<h2 className='subtext'>Ganadores</h2>
          }
          
          {
            Ganador.map((ganador,index)=>{
              return <div id='gan'>
                <span className='text'>{ganador}</span>
                </div>
            })
          }
            
        </div>
        </div>
      }
  
    </div>
  )
}

export default App
