import axios from "axios";
import { ChatPage } from "../../Pages/chatPage";
import { HomePage } from "../../Pages/homePage";
import { MainHeader } from "../../Pages/mainPage";
import { Login } from "../Authentication/Login";
import { Singup } from "../Authentication/Singup";



 const instance = axios.create({
    baseURL: 'http://localhost:8080',
  });




export {
    ChatPage,
    HomePage,
    MainHeader,
    Login,
    Singup,
    instance

}
