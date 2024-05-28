import { signInWithPopup } from 'firebase/auth'
import {auth , provider} from "./../firebase/config"


const LoginPage = ({setIsAuth}) => {
const handlaClick = ()=>{

signInWithPopup(auth,provider).then((data)=>{

            setIsAuth(true);      
            localStorage.setItem("TOKEN",data.user.refreshToken)
})


      }            


  return (
    <div className='container'>
      <div className='login'>
  <h1>Chat Odası</h1>
 <p>Devam etmek için giriş yapın </p>
 <button onClick={handlaClick}>
  <img src="https://clipartcraft.com/images/google-logo-transparent-doodle-3.png" alt="" />
  <span>Google  ile gir</span>
 </button>
      </div>
    </div>
  )
}

export default LoginPage
