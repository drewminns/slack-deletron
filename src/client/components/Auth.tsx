import React from 'react';
import { connect } from 'react-redux';
import { loginUser, logoutUser, fetchUserProfile, IInitialState } from '../store';
import { IUserReponse } from '../../shared/interfaces';

interface IAuthProps {
  loginUser: Function;
  logoutUser: Function;
  fetchUserProfile: Function;
  token: string;
  profile: IUserReponse;
}

class AuthComponent extends React.Component<IAuthProps> {
  constructor(props: IAuthProps) {
    super(props);
  }

  componentDidMount() {
    const URLtoken = new URLSearchParams(location.search).get('token');
    const token = localStorage.getItem('sd-token');

    if (URLtoken) {
      this._setTokenFromURL(URLtoken);
      return;
    } else if (!token) {
      this.props.logoutUser();
      return;
    }

    this.props.loginUser(token);
    this.props.fetchUserProfile(token);
  }

  _handleLogout = () => {
    this.props.logoutUser();
  };

  _setTokenFromURL = (token: string) => {
    this.props.loginUser(token);
  };

  render() {
    if (!this.props.token) {
      return (
        <>
          <a href="/api/auth/slack">Log in</a>
        </>
      );
    }

    const { real_name } = this.props.profile;
    return (
      <>
        <button onClick={this._handleLogout}>Log Out</button>
        <p>{real_name}</p>
      </>
    );
  }
}

const mapStateToProps = ({ user: { token, profile } }: IInitialState) => {
  return { token, profile };
};

export const Auth = connect(
  mapStateToProps,
  { loginUser, logoutUser, fetchUserProfile },
)(AuthComponent);
