import axios from 'axios'
import api from '../api'
class AuthService {

    getCurrentUser = () => {return JSON.parse(localStorage.getItem('user'));}

    async postRegister(user, pass, mail) {
      try {
        //const response = await post('/experiencia', experiencia);

        const usuario =  {
            username: user,
            password: pass,
            mail: mail
          }
        const response = await api.postRegister(usuario)
        console.log(response)
        return (response.data.error)


        //seteo en true el estado de redirección

      } catch(error) {
        console.log('error', error);
      }
    }

    async  postLogin(user, pass, from) {
         try {
           //const response = await post('/experiencia', experiencia);
           const usuario =  {
               username: user,
               password: pass,
             }

           const response = await api.postLogin(usuario)
           //console.log("response: " + response.status)
           if (response.status === 200) {
              //  console.log("entroooo al 200: "+response.data.username)
                if (response.data.accessToken) {
                   localStorage.setItem("user", JSON.stringify(response.data));
                  // console.log("valido ok, ahora guarda el token: "+JSON.parse(localStorage.getItem('user')))
                 }
                return true;
           }else{console.log("algo salió mal ")}
         } catch(error) {
           console.log('error', error);
         }
       }
       logout() {
          localStorage.removeItem("user");
        }

}
   export default new AuthService();
