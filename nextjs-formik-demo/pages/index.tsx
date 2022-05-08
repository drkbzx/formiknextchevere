import { useState } from 'react';

import { useFormik } from 'formik';
import type { NextPage } from 'next';
import * as yup from 'yup';

import 'bootstrap/dist/css/bootstrap.min.css';

const Home: NextPage = () => {
  const [message, setMessage] = useState(''); // This will be used to show a message if the submission is successful
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      direccionRecoleccion: '',
      numsol: '',
      numrec: '',
      direccionEntrega: '',
      message: '',
      message2: '',
    },
    onSubmit: () => {

      if (formik.values.message2 === '') {
        formik.values.message2 = 'Sin notas adicionales! :)'
      }

      const url2 = `https://api.whatsapp.com/send/?phone=5214922648447&text=%2A%F0%9F%9A%80PEDIDO%20CH%C3%89VERE%3A%F0%9F%A4%99%2A%0A________%0A%F0%9F%93%84${
        encodeURIComponent(formik.values.message)
      }%0A________%0A%2A%F0%9F%8E%92SE%20RECOGE%20EN%3A%E2%A4%B5%2A%0A${
        encodeURIComponent(formik.values.direccionRecoleccion)
      }%0A.%0A%2A%F0%9F%93%B2N%C3%9AMERO%20DE%20QUIEN%20SOLICITA%3A%E2%A4%B5%2A%0A${
        encodeURIComponent(formik.values.numsol)
				}%0A________%0A%2A%F0%9F%8F%81SE%20ENTREGA%20EN%3A%E2%A4%B5%2A%0A${
					encodeURIComponent(formik.values.direccionEntrega)
				}%0A.%0A%2A%F0%9F%93%B2N%C3%9AMERO%20DE%20QUIEN%20RECIBE%3A%E2%A4%B5%2A%0A${
					encodeURIComponent(formik.values.numrec)
				}%0A________%0A%2A%F0%9F%93%84NOTAS%20ADICIONALES%3A%E2%A4%B5%2A%0A${
					encodeURIComponent(formik.values.message2.trim())
				}`;
      console.log(encodeURIComponent(formik.values.message2.trim()));
    },
    validationSchema: yup.object({
      direccionRecoleccion: yup.string().trim()
      .required('Escriba correctamente la dirección')
      .min(20, 'Escriba una dirección válida'),
      direccionEntrega: yup.string().trim()
      .required('Escriba correctamente la dirección')
      .min(20,'Escriba una dirección válida'),
      numsol: yup.string().required('Debe agregar el número de teléfono')
      .matches(/^[0-9]+$/, 'Escribe sólo números')
      .min(10, 'Deben ser 10 digitos')
      .max(10, 'Deben ser 10 dígitos'),
      numrec: yup.string().required('Debe agregar el número de teléfono')
      .matches(/^[0-9]+$/, 'Escribe sólo números')
      .min(10, 'Deben ser 10 digitos')
      .max(10, 'Deben ser 10 dígitos'),
      message: yup.string().trim()
      .required('Escriba detalladamente, información adicional será cobrada')
      .min(10, 'Describa correctamente su pedido'),
      message2: yup.string().trim(),
    }),
  });

  return (
    <div className="vh-260 d-flex flex-column justify-content-center align-items-center">
      <div hidden={!submitted} className="alert alert-primary" role="alert">
        {message}
      </div>

      <h1 className="mt-5">PEDIDOS CHÉVERE</h1>

      <form className="w-70 my-5" onSubmit={formik.handleSubmit}>

      <div className="mb-3 border rounded border-warning alert alert-warning">
        <h4 className='alert-heading'>DETALLES DEL PEDIDO</h4>
          <label htmlFor="pedido" className="form-label">
            <strong>Describa detalladamente</strong> su pedido
          </label>
          <textarea
            name="message"
            className="form-control"
            placeholder="Ejemplo: Pasar a recoger un paquete a DHL..."
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.message && (
            <div className="text-danger">{formik.errors.message}</div>
          )}
        </div>
            <hr />
        <div className="mb-3 border rounded border-success alert alert-success">
        <h4 className='alert-heading'>DATOS DE RECOLECCIÓN</h4>
          <label htmlFor="direccionRecoleccion" className="form-label">
            Dirección completa de recolección:
          </label>
          <input
            type="text"
            name="direccionRecoleccion"
            className="form-control"
            placeholder="Calle, #, colonia, referencia, nombre del lugar, etc"
            value={formik.values.direccionRecoleccion}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.direccionRecoleccion && (
            <div className="text-danger">{formik.errors.direccionRecoleccion}</div>
          )}
          <br />
          <label htmlFor="numsol" className="form-label">
            Número de teléfono de quien solicita el servicio
          </label>
          <input
            type="text"
            name="numsol"
            className="form-control"
            placeholder="4921112323"
            value={formik.values.numsol}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            maxLength={10}
          />
          {formik.errors.numsol && (
            <div className="text-danger">{formik.errors.numsol}</div>
          )}
        </div>
            <hr />
        <div className="mb-3 border rounded border-primary alert alert-primary">
          <h4 className='alert-heading'>DATOS DE ENTREGA</h4>
          <label htmlFor="direccionEntrega" className="form-label">
            Dirección completa de entrega:
          </label>
          <input
            type="text"
            name="direccionEntrega"
            className="form-control"
            placeholder="Calle, #, colonia, referencia, nombre del lugar, etc"
            value={formik.values.direccionEntrega}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.direccionEntrega && (
            <div className="text-danger">{formik.errors.direccionEntrega}</div>
          )}
          <br />
          <label htmlFor="numrec" className="form-label">
            Número de teléfono de quien solicita el servicio
          </label>
          <input
            type="text"
            name="numrec"
            className="form-control"
            placeholder="4921112424"
            value={formik.values.numrec}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            maxLength={10}
          />
          {formik.errors.numrec && (
            <div className="text-danger">{formik.errors.numrec}</div>
          )}
        </div>
        <hr />
        <div className="mb-3">
          <label htmlFor="message2" className="form-label">
            Notas adicionales para el repartidor (opcional)
          </label>
          <textarea
            name="message2"
            className="form-control"
            placeholder="Traer cambio de $200 ..."
            value={formik.values.message2}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.message2 && (
            <div className="text-danger">{formik.errors.message2}</div>
          )}
        </div>
        <div className="mb-3 col text-center">
          <button type="submit" className="btn btn-success shadow-sm">
            Enviar por WhatsApp
          </button>
        </div>
        
      </form>
    </div>
  );
};

export default Home;