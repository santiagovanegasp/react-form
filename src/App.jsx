import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    age: "",
    phoneNumber: "",
    password: "",
    repeatPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false); // to show data 

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // change to validation online
    if (touched) {
      validateField(name, value);
    }
  };

  // regex
  const namesRegex = /^[a-zA-Z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const ageRegex = /^\d+$/;
  const phoneRegex = /^\d{9,10}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

 // solo validation
  const validateField = (name, value) => {
    let errorMessage = "";

    switch (name) {
      case "FirstName":
        if (!namesRegex.test(value)) {
          errorMessage = "The name can not contain numbers.";
        }
        break;
      case "LastName":
        if (!namesRegex.test(value)) {
          errorMessage = "The lastname can not contain numbers.";
        }
        break;
      case "email":
        if (!emailRegex.test(value)) {
          errorMessage = "Please, write a valid email.";
        }
        break;
      case "age":
        if (!ageRegex.test(value) || parseInt(value) <= 0) {
          errorMessage = "The age needs to be a positive number";
        }
        break;
      case "phoneNumber":
        if (!phoneRegex.test(value)) {
          errorMessage = "Please, write a valid phone number";
        }
        break;
      case "password":
        if (!passwordRegex.test(value)) {
          errorMessage =
            "Your password must contain: At least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character (e.g., @, $, !, %, *, ?, &).";
        }
        break;
      case "repeatPassword":
        if (value !== formData.password) {
          errorMessage = "The password does not match";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  // complete validation 
  const validateForm = () => {
    const newErrors = {};

    if (!namesRegex.test(formData.FirstName)) {
      newErrors.FirstName = "The name can not contain numbers.";
    }

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please, write a valid email.";
    }

    if (!ageRegex.test(formData.age) || parseInt(formData.age) <= 0) {
      newErrors.age = "The age needs to be a positive number";
    }
    if (!namesRegex.test(formData.LastName)) {
      newErrors.LastName = "The lastname can not contain numbers";
    }
    if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please, write a valid phone number";
    }
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Your password must contain: At least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character (e.g., @, $, !, %, *, ?, &).";
    }
    if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = "The password does not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // 
  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched(true); 

    if (validateForm()) {
      console.log("form send", formData);
      setFormSubmitted(true); // Indicar que el formulario fue enviado correctamente
    } else {
      console.log("errors in form ", errors);
    }
  };

  // Función para manejar el botón de volver a editar
  const handleEdit = () => {
    setFormSubmitted(false); // Resetear el estado de envío para poder editar
    setFormData({
      FirstName: "",
      LastName: "",
      email: "",
      age: "",
      phoneNumber: "",
      password: "",
      repeatPassword: "",
    });
    setErrors({});
  };

  return (
    <div className="container-form">
      <h1>SIGN UP</h1>

      {formSubmitted ? (
        <div className="formSubmitted">
          <h2>Form successfully submitted!</h2>
          <p><strong>First Name:</strong> {formData.FirstName}</p>
          <p><strong>Last Name:</strong> {formData.LastName}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Age:</strong> {formData.age}</p>
          <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
          <p><strong>Password:</strong> {formData.password}</p>
          <button onClick={handleEdit} className="btnEdit">Edit</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>{errors.FirstName && <p>{errors.FirstName}</p>}</label>
            <input
              type="text"
              name="FirstName"
              value={formData.FirstName}
              onChange={handleChange}
              placeholder="First Name"
            />
          </div>

          <div>
            <label>{errors.LastName && <p>{errors.LastName}</p>}</label>
            <input
              type="text"
              name="LastName"
              value={formData.LastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
          </div>

          <div>
            <label>{errors.email && <p>{errors.email}</p>}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>

          <div>
            <label>{errors.age && <p>{errors.age}</p>}</label>
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
            />
          </div>

          <div>
            <label>{errors.phoneNumber && <p>{errors.phoneNumber}</p>}</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
            />
          </div>

          <div>
            <label>{errors.password && <p>{errors.password}</p>}</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </div>

          <div>
            <label>{errors.repeatPassword && <p>{errors.repeatPassword}</p>}</label>
            <input
              type="password"
              name="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleChange}
              placeholder="Repeat Password"
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default App;
