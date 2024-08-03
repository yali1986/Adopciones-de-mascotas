import { useState, useContext, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CatContext } from '../context/CatContext'
import { useTranslation } from 'react-i18next'
import { useRef } from 'react'
import emailjs from '@emailjs/browser'

const Form = () => {

  const {t} = useTranslation("translation")
  const { cats, selectedCat } = useContext(CatContext)
  const [message, setMessage] = useState({ text: "", className: "" })
  const [selectedCatId, setSelectedCatId] = useState("")
  const [selectedOption, setSelectedOption] = useState("")
  const location = useLocation()
  const form = useRef()

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs
      .sendForm('service_sl3j2jo', 'template_q9cmd8b', form.current, {
        publicKey: 'KuHrCYqPkMNyMtV8m',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

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
    setMessage({ text: t("main.formsuccess"), className: "text-success" })
  }

  const handleSelectChange = (e) => {
    setSelectedCatId(e.target.value)
  }

  return (
    <>
<form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />

      <label>Email</label>
      <input type="email" name="user_email" />

      <label>Phone</label>
      <input type="phone" name="user_phone" />

      <label>Message</label>
      <textarea name="message" />
      
      <input type="submit" value="Send" />
    </form>


    <div className='container-fluid'>
      <div className='row'>
        <div className="col-6 mx-auto">
          <div className='card p-3 mt-5 shadow p-4 bg-body-tertiary ps-5' style={{ border: "none", maxHeight:"740px" }}>
            <h1 className='card-title'>{t("main.form")}</h1>

            <form onSubmit={handleSubmit} className='card-body' action='../components/sendemail.php' method='post'>
              <input className='row mb-3 w-75' type="text" name="name" placeholder={t("main.username")} id="name" required />
              <input className='row mb-3 w-75' type="text" name="dni" placeholder='DNI/Passport' id="dni" required />
              <input className='row mb-3 w-75' type="number" name="phone" placeholder={t("main.userphone")} id="phone" required />
              <input className='row my-3 mb-4 w-75' type="email" name="email" placeholder='Email' id="email" required />

              <select className="form-select form-select-sm row w-75 mb-3" name="subject" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} required>
                <option value="0">{t("main.select")}</option>
                <option value="1">{t("main.adopction")}</option>
                <option value="2">{t("main.shelterhouse")}</option>
                <option value="3">{t("main.bepartner")}</option>
                <option value="4">{t("main.needcontact")}</option>
                <option value="5">{t("main.bevoluntier")}</option>
              </select>

              <p className='mt-3 mb-1 row'>{t("main.animalname")}</p>
              <select className="form-select form-select-sm row w-75" name="animal" value={selectedCatId} onChange={handleSelectChange}>
                <option value="" disabled>{t("main.selectanimal")}</option>
                {cats.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>           


              <p className='mt-3 mb-3 row'>{t("main.comment")}</p>
              <textarea className='row my-3 mb-4 w-75' name="comment" id="comment" rows="4" />

              <button className='btn btn-warning row mb-3 px-5' type='submit'>{t("main.submit")}</button>
            </form>
            {message.text && <p className={message.className}>{message.text}</p>}
           
          </div>

          <div className='row mt-3 ms-3'>
          <Link to="/">
              <button className='btn btn-outline-warning my-3 ms-4'>{t("main.backlist")}</button>
            </Link>
          </div>

        </div>
      </div>
    </div>
    </>
  )
}

export default Form 