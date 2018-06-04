import React from 'react';
import Cookie from 'js-cookie';
import Faker from 'faker';

const getUserName = () => {
  const name = Cookie.get('userName');
  if (name) {
    return name;
  }
  Cookie.set('userName', Faker.name.findName());
  return Cookie.get('userName');
};

const UserContext = React.createContext({
  userName: getUserName(),
});

export default UserContext;
