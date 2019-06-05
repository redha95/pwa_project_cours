import { LitElement,html,css } from 'lit-element';
import firebase from 'firebase/app';
import 'firebase/auth';

class ChatLogin extends LitElement {
    constructor(){
        super();
        this.email = "";
        this.password = "";
    }
    static get properties(){
        return {
            email : String,
            password : String
        };
    }
    static get styles(){
        return css`
        :host {
            display:block;
        }`;
    }

    firstUpdated() {
        firebase.auth().onAuthStateChanged(user => {
            if( !user) {
                localStorage.setItem('logged',false)
                return console.log('deconnecté');
            }
            localStorage.setItem('logged', true);
            this.dispatchEvent( new CustomEvent('user-logged', { detail: { user }}));
        });
    }

    handleForm(e){
        e.preventDefault();
        if(!this.email || !this.password) {
            return console.error("Un des deux champs est vide");
        }
        firebase.auth().signInWithEmailAndPassword(this.email,this.password).then( user => {
            console.log("vous êtes connecté", user);
        }).catch(console.log);
    }

    render() {
        return html `
        <h1> Connexion </h1>
        <form @submit="${this.handleForm}">
            :<input type="text" .value="${this.email}" @input="${e => this.email = e.target.value}">
            <input type="password" .value="${this.password}" @input="${e => this.password = e.target.value}">
            <button type="submit"> Se connecter </button>    
        </form>
        `;
    }
}
customElements.define('chat-login', ChatLogin);