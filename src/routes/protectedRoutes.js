import { Redirect, Route } from "react-router-dom";
import { errorToster } from "../components/layouts/toster";


const PrivateRoute =({ component: Component, ...rest }) => {

    const authtoken = localStorage.getItem('token');

    return (
        <Route
            {...rest}
            render={props =>
            authtoken ? (
                <Component {...props} />
            ) : (
                redirect(props)
            )
            }
        />
    );
}

const redirect = (props)=>{

    errorToster("Please login, for use this feature");

    return (
        <Redirect
        to={{
            pathname: "/home",
            state: { from: props.location }
        }}
        />
    )
}
export default PrivateRoute;
  