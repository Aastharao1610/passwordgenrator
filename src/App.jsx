import { useState ,useCallback, useEffect,useRef} from 'react'
import './App.css'

function App() {
  
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false)
  const [password, setPassword] = useState("")
  

  //userefhhok

  const passwordRef=useRef(null)

//Callback is for optimization
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (number) str += "0123456789"
    if (char) str += "!@#$%^&*-_+=[]{}~`"
// math.random is used for generating random characters by the data which we provide
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }

    setPassword(pass)


  }, [length, number, char, setPassword])

 const copyPasswordToClipboard=useCallback(()=>{
  window.navigator.clipboard.writeText(password)
  passwordRef.current?.select()
  alert('copied to clipboard')
 },
 [password]) 

//useefect is for updation 
  useEffect(() => {
    passwordGenerator()
  }, [length, number ,char, passwordGenerator])




  return (
<>
 <div className='bg-gray-400 place-content-center my-5 mx-20 w-1/20'>

  <div className='flex justify-center my-5'>
    <input className="bg-white border-black text-black my-4 px-4  py-2  rounded" type="text"
    placeholder='password generator'
     value={password}
    readOnly 
    ref={passwordRef}/>
    <button
    onClick={copyPasswordToClipboard}
     className='bg-blue-500 text-white my-4 px-4 py-2 rounded focus:bg-blue-900 focus:px-7 focus:rounded-lg hover:bg-blue-200 hover:text-black'>
      Copy
    </button>
  </div>
  <div className='flex justify-evenly'>
  
   <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
      </div>
  <div className='flex items-center gap-x-1'>
  <input 
   type="checkbox"
  defaultChecked={char}
  id="char"
  onChange={()=>{
    setChar((prev)=>!prev);
  }} />
 <label 
 htmlFor='charInput'
 >Char</label>
  </div>
  <div className='flex items-center gap-x-1'>
  <input type="checkbox"
  defaultChecked={number}
  id="numbers"
  onChange={()=>{
    setNumber((prev)=>!prev);
  }} />
  <label 
 htmlFor='numberInput'
 >Number</label>
  </div>
  </div>
  </div>
  </>
//   )
  )
            }
export default App
            


//   return (
//  <>
 



