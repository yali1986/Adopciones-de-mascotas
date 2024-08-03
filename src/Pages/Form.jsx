import { useState, useContext, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CatContext } from '../context/CatContext';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';

const Form = () => {
  const { t } = useTranslation("translation")
  const { cats, selectedCat } = useContext(CatContext)
  const [message, setMessage] = useState({ text: "", className: "" })
  const [selectedCatId, setSelectedCatId] = useState("")
  const [selectedOption, setSelectedOption] = useState("")
  const location = useLocation()
  const form = useRef()

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs
      .sendForm('service_sl3j2jo', 'template_q9cmd8b', form.current, 'KuHrCYqPkMNyMtV8m')
      .then(
        () => {
          console.log('SUCCESS!')
          setMessage({ text: t("main.formsuccess"), className: "text-success" })
        },
        (error) => {
          console.log('FAILED...', error.text);
          setMessage({ text: t("main.formerror"), className: "text-danger" })
        }
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
  }, [location]);

  useEffect(() => {
    if (selectedCat) {
      setSelectedCatId(selectedCat.id)
    }
  }, [selectedCat])

  const handleSelectChange = (e) => {
    setSelectedCatId(e.target.value)
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className="col-6 mx-auto">
          <div className='card p-3 mt-5 shadow p-4 bg-body-tertiary ps-5' style={{ border: "none", maxHeight: "740px" }}>
            <h1 className='card-title'>{t("main.form")}</h1>

            <form ref={form} onSubmit={sendEmail} className='card-body'>
              <input className='row mb-3 w-75' type="text" name="user_name" placeholder={t("main.username")} id="name" required />
              <input className='row mb-3 w-75' type="text" name="dni" placeholder='DNI/Passport' id="dni" required />
              <input className='row mb-3 w-75' type="phone" name="user_phone" placeholder={t("main.userphone")} id="phone" required />
              <input className='row my-3 mb-4 w-75' type="email" name="user_email" placeholder='Email' id="email" required />

              <select className="form-select form-select-sm row w-75 mb-3" name="subject" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} required>
                <option value={t("main.select")}>{t("main.select")}</option>
                <option value={t("main.adoption")}>{t("main.adoption")}</option>
                <option value={t("main.shelterhouse")}>{t("main.shelterhouse")}</option>
                <option value={t("main.bepartner")}>{t("main.bepartner")}</option>
                <option value={t("main.needcontact")}>{t("main.needcontact")}</option>
                <option value={t("main.bevoluntier")}>{t("main.bevoluntier")}</option>
              </select>

              <p className='mt-3 mb-1 row'>{t("main.animalname")}</p>
              <select className="form-select form-select-sm row w-75" name="animal" value={selectedCatId} onChange={handleSelectChange}>
                <option value="" disabled>{t("main.selectanimal")}</option>
                {cats.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>           

              <p className='mt-3 mb-3 row'>{t("main.comment")}</p>
              <textarea className='row my-3 mb-4 w-75' name="message" id="message" rows="4" />

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
  )
}

export default Form