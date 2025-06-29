import React from 'react'

function Login() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <h1>Login</h1>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '300px',
        }}
      >
        <input type="text" placeholder="Usuário" />
        <input type="password" placeholder="Senha" />
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}

export default Login