import { useState, useContext, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CatContext } from '../context/CatContext'

const Form = () => {
  const { cats, selectedCat } = useContext(CatContext)
  const [message, setMessage] = useState({ text: "", className: "" })
  const [selectedCatId, setSelectedCatId] = useState("")
  const [selectedOption, setSelectedOption] = useState("")
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const type = params.get('type')
    if (type === 'partner') {
      setSelectedOption("3")
    } else if (type === 'contact') {
      setSelectedOption("0")
    } else if (type === 'voluntier') {
      setSelectedOption("5")
    } 
  }, [location])

  useEffect(() => {
    if (selectedCat) {
      setSelectedCatId(selectedCat.id)
    }
  }, [selectedCat])

  const handleSubmit = (e) => {
    e.preventDefault()
    setMessage({ text: "Formulario enviado con éxito, pronto nos pondremos en contacto con usted.", className: "text-success" })
  }

  const handleSelectChange = (e) => {
    setSelectedCatId(e.target.value)
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className="col-6 mx-auto">
          <div className='card p-3 mt-5 shadow p-4 bg-body-tertiary' style={{ border: "none", maxHeight:"620px" }}>
            <h1 className='card-title'>Formulario</h1>
            <form onSubmit={handleSubmit} className='card-body'>
              <input className='row mb-3' type="text" placeholder='Nombre y apellidos' id="nombre" required />
              <input className='row mb-3' type="text" placeholder='DNI' id="dni" required />
              <input className='row mb-3' type="number" placeholder='Teléfono' id="tlf" required />

              <select className="form-select form-select-sm row w-50 mb-3" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} required>
                <option value="0">Seleccione</option>
                <option value="1">Adopción</option>
                <option value="2">Casa de acogida</option>
                <option value="3">Quiero ser socio</option>
                <option value="4">Necesito que me contacten</option>
                <option value="5">Quiero ser voluntario</option>
              </select>

              <p className='mt-3 mb-1 row'>Nombre del animal (opcional)</p>
              <select className="form-select form-select-sm row w-50" value={selectedCatId} onChange={handleSelectChange}>
                <option value="" disabled>Seleccione el nombre del animal</option>
                {cats.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>

              <input className='row my-3 mb-4' type="email" placeholder='Email' id="email" required />
              <button className='btn btn-warning row mb-3 px-5' type='submit'>Enviar</button>
            </form>
            {message.text && <p className={message.className}>{message.text}</p>}
            <Link to="/">
              <button className='btn btn-outline-warning ms-1'>Volver al listado</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Form
