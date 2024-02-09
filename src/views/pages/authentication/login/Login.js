import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import loginImg from "../../../../assets/img/pages/login.png";
import "../../../../assets/scss/pages/authentication.scss";
import LoginAuth0 from "./LoginAuth0";
import LoginFirebase from "./LoginFirebase";
import LoginJWT from "./LoginJWT";

class Login extends React.Component {
  state = {
    activeTab: "1",
    email: "",
    password: "",
  };
  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  render() {
    return (
      <Row className="m-0 pt-4 d-flex align-items-center justify-content-center w-100">
        <Col
          sm="8"
          xl="7"
          lg="10"
          md="8"
          className="d-flex justify-content-center my-4"
        >
          <Card className="bg-authentication login-card rounded-4">
            <Row className="m-0">
              <Col
                lg="6"
                className="d-lg-block d-none text-center align-self-center px-1 py-0"
              >
                <img className="img-fluid" src={loginImg} alt="loginImg" />
              </Col>
              <Col lg="6" md="12" className="p-0">
                <Card className="rounded-0 mb-0 px-2 login-tabs-container">
                  <CardHeader className="pb-1">
                    <CardTitle>
                      <h4 className="mb-0">GrowBuild </h4>
                    </CardTitle>
                  </CardHeader>
                  <p className="px-2 auth-title">
                    Please login to your account.
                  </p>

                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                      <LoginJWT />
                    </TabPane>
                    <TabPane tabId="2">
                      <LoginFirebase />
                    </TabPane>
                    <TabPane tabId="3">
                      <LoginAuth0 />
                    </TabPane>
                  </TabContent>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    );
  }
}
export default Login;
