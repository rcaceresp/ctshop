import React from "react";
import { AuthUserContext, withAuthorization } from '../../components/session';
import ConfirmationDetail from '../../components/confirmation/detail';

const ConfirmationPage = props => (
  <AuthUserContext.Consumer>
    {authUser => (
      <ConfirmationDetail order={props.order}/>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ConfirmationPage);