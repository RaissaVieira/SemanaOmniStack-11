import React, {useState} from 'react'

import './style.css'
import { Link, useHistory } from 'react-router-dom'
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'
import {FiLogIn} from 'react-icons/fi'
import api from '../../services/api'

export default function Logon(){
    const [id, setId] = useState('')

    const history = useHistory()

    async function handleLogin(e){
        e.preventDefault()

        try {
            const response = await api.post('session', {id})

            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', response.data.name)

            history.push('/profile')
        } catch (error) {
            alert('Falha no login, tente novamente.')
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt = "Be the Hero"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input 
                        placeholder="Sua ID"
                        value = {id}
                        onChange = {e => setId(e.target.value)}
                    />
                    <button type="submit" className = "button">Entrar</button>

                    <Link to = "/register" className="back-link">
                        <FiLogIn size = {16} color="#e02041"></FiLogIn>
                        Não possuo cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    )
}