'use client'

import React, { useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Button } from 'react-bootstrap';
import { User } from '@/backend/model/user';
import { UserClient } from '@/frontend/client/user/user-client';
import BackendUserClient from '@/frontend/client/user/backend-user-client';
import userReducer, { userInitialState } from '@/frontend/reducer/user-reducer';

const userClient: UserClient = new BackendUserClient();

export default function Page() {
  const [user, dispatch] = useReducer(userReducer, userInitialState);

  const router = useRouter();

  const handleCreateUser = async () => {
    const userData: User = {
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      weight: user.weight,
      smoker: user.smoker
    };

    const newUser = await userClient.create(user);

    if (!newUser) return;

    router.push('/users');
  };

  return (
    <Form className="mt-3">
      <Form.Group controlId="first-name">
        <Form.Label>First Name</Form.Label>

        <Form.Control
          type="text"
          value={user.firstName}
          onChange={(e) => dispatch({
            type: 'UPDATE_USER',
            payload: { firstName: e.target.value }
          })}
        />
      </Form.Group>

      <Form.Group controlId="last-name" className="mt-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          value={user.lastName}
          onChange={(e) => dispatch({
            type: 'UPDATE_USER',
            payload: { lastName: e.target.value }
          })}
        />
      </Form.Group>

      <Form.Group controlId="age" className="mt-3">
        <Form.Label>Age</Form.Label>
        <Form.Control
          type="text"
          value={user.age}
          onChange={(e) => dispatch({
            type: 'UPDATE_USER',
            payload: { age: Number(e.target.value) }
          })}
        />
      </Form.Group>

      <Form.Group controlId="weight" className="mt-3">
        <Form.Label>Weight</Form.Label>
        <Form.Control
          type="text"
          value={user.weight}
          onBlur={(e) => dispatch({
            type: 'UPDATE_USER',
            payload: { weight: Number(e.target.value) }
          })}
        />
      </Form.Group>

      <Form.Group controlId="smoker" className="mt-3">
        <Form.Label>Smoker</Form.Label>
        <Form.Check
          type="checkbox"
          id="smoker-checkbox"
          checked={user.smoker || false}
          onChange={(e) => dispatch({
            type: 'UPDATE_USER',
            payload: { smoker: e.target.checked }
          })}
        />
      </Form.Group>

      <Button className="mt-3" variant="primary" type="button" onClick={handleCreateUser}>
        Submit
      </Button>
    </Form>
  );
};
