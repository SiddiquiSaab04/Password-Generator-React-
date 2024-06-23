


import { useCallback, useEffect, useRef, useState } from "react"


function App() {
  const [length,setLength] = useState(8)
  const [num,setNum] = useState(false);
  const [char,setChar] = useState(false);
  const [password,setPassword] = useState("")

  const passwordRef = useRef(null)
  const copyToClipBoard = () => {
  passwordRef.current?.select();
  window.navigator.clipboard.writeText(password);

  }


  const passwordGenerator = useCallback(()=>{
  
    let pass="";
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(num) str += "0123456789";
    if(char) str += "!@#$%^&*(){}_";

    for(let i = 0; i<= length ; i++){
      let character = Math.floor(Math.random() * str.length + 1); 
      pass += str.charAt(character);
    }


    setPassword(pass);
 

  },[length,num,char])
    
  useEffect(()=>{
    passwordGenerator();
  },[length,num,char,passwordGenerator])


  return (
    <>
     <div className="w-full max-w-md mx-auto shadow-md rounded-lg 
     px-4 my-8 text-orange-500 bg-gray-800 pb-4">
      <h1 className="text-4xl font-semibold text-center my-3">Password Generator</h1>
     <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input type="text"
      value={password}
      className="outline-none w-full py-2 px-3"
      placeholder="password"
      readOnly
      ref={passwordRef}
      />
      <button 
      onClick={copyToClipBoard}
      className="outline-none cursor-pointer bg-blue-700 text-white px-3 py-0.5 shrink-0">copy</button>
     </div>
      
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input type="range" min={6}
          max={100} 
          value={length}
          className="cusrsor-pointer"
          onChange={(e)=>{setLength(e.target.value)}}
          />
          <label>length:{length}</label>
        </div>
        <div className="flex items-center gap-x-1">
         <input type="checkbox"
         defaultChecked={num}
         id="numberInput"
         onChange={()=>{setNum((prev)=> !prev)}}
         />
         <label> Numbers </label>
        </div>
        <div className="flex items-center gap-x-1">
         <input type="checkbox"
         defaultChecked={char}
         id="numberInput"
         onChange={()=>{setChar((prev)=> !prev)}}
         />
         <label> Characters </label>
        </div>
      </div>

     </div>
    </>
  )
}

export default App;
