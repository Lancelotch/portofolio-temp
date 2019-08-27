import React, {useEffect} from "react";
import Headers from "containers/Header";
import Footer from "components/Footer";
import "./style.sass";
import ScrollToTopOnMount from "../../components/ScrollToTopOnMount";
import { useRootContext } from "../../hoc/RootContext";



export default function CustomerLayout (props) {
  const {isAuthenticated, history} = useRootContext();

  useEffect(() => {
    if(props.needAuthenticated && !isAuthenticated){
      history.push('/login');
    }      
  })

  if(props.needAuthenticated && !isAuthenticated){
    return null;
  } else {
    return (
      <div className="customerLayout">
        <ScrollToTopOnMount />
        <Headers match={props} />
        <div className="container">{props.children}</div>
        <Footer />
      </div>
    );
  }
}

