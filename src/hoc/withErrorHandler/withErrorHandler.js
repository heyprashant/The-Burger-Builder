import React, { Component } from "react";
import Aux from "../Auxx/Auxx";
import Modal from "../../components/UI/Modal/Modal";

//in this approcah of HOC we acctually return the same componenet by adding extra functionality
//it is like the same component, but in this we are return the component which return the jsx

const withErrorHandler = (WrappedComponenet, axios) => {
  return class extends Component {
    state = {
      error: null,
    };
    errorConfirmedHandler=()=>{
        this.setState({error:null})
    }
    componentDidMount() {
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
    },);
    //always return req and response to pass it to next middlware, otherwise it will blocked here.
      this.resInterceptor = axios.interceptors.response.use( res=>res, (error) => {
        this.setState({ error: error });
      });
    }
    //using interceptors.response(simpilar to middleware) to check repsonse if it has any error(basically handling error)
    //using interceptors.request to set error = null asgin when we send new request

//REMOVINg OLD interceptors instances before this component will unmount
    componentWillUnmount(){
      axios.interceptors.request.eject(this.reqInterceptor);
      // axios.interceptors.resopnse.eject(this.resInterceptor);

    }

    render() {
      return (
        <Aux>
          <Modal show={this.state.error} modalClosed ={this.errorConfirmedHandler}>
              {this.state.error? this.state.error.message : null}
          </Modal>
          <WrappedComponenet {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;

//This is another way of creating higher order component, by using this we can wrap component during export.
//<WrappedComponenet {...this.props} />;: we are passing recieving ...this.props to the wrapped component
