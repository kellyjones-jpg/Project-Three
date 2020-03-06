import React from "react";

class Login extends React.Component {
    state = {
        
    };

   // LOGIN: need input fields (name, password, email)
   // REGISTER: need input fields (..., password2)

   handleSubmit = () => {
       // handle form submit
       // captures input values
       // sends values to api register route, as an object {name, email, pw}
       // on response, redirect to home page
   }

    render() {
        return (
            <div className="login">
                
            </div>
        );
    }
}

export default Login;