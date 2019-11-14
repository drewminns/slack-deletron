import React from 'react';
import { connect } from 'react-redux';
import { loginUser, logoutUser, fetchUserProfile, IInitialState, fetchChannels } from '../store';
import { IUserReponse } from '../../shared/interfaces';

import { Button } from '../Components/Button';

interface IAuthProps {
  loginUser: Function;
  logoutUser: Function;
  fetchUserProfile: Function;
  fetchChannels: Function;
  token: string;
  profile: IUserReponse;
}

class AuthComponent extends React.Component<IAuthProps> {
  componentDidMount() {
    const URLtoken = new URLSearchParams(location.search).get('token');
    const token = localStorage.getItem('sd-token');
    if (URLtoken) {
      this._setTokenFromURL(URLtoken);
    } else if (!token) {
      this._handleLogout();
      return;
    } else if (token) {
      this._setTokenFromURL(token);
    }
  }

  _handleLogout = () => {
    this.props.logoutUser();
  };

  _setTokenFromURL = (token: string) => {
    this.props.loginUser(token);
    this.props.fetchUserProfile(token);
    this.props.fetchChannels();
  };

  render() {
    if (!this.props.token) {
      return (
        <>
          <a href="/api/auth/slack">Log in</a>
        </>
      );
    }

    const { real_name, avatar_72 } = this.props.profile;
    return (
      <>
        <Button content="Log Out" handleClick={this._handleLogout} />
        <p>{real_name}</p>
        <div>
          <img src={avatar_72} />
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ user: { token, profile } }: IInitialState) => {
  return { token, profile };
};

export const Auth = connect(
  mapStateToProps,
  { loginUser, logoutUser, fetchUserProfile, fetchChannels },
)(AuthComponent);
