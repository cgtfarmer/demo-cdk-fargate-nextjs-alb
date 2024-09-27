'use client'

import React, { useEffect, useReducer } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Form, Button } from 'react-bootstrap';
import { UserClient } from '@/frontend/client/user/user-client';
import BackendUserClient from '@/frontend/client/user/backend-user-client';
import { User } from '@/frontend/model/user';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import userReducer, { userInitialState } from '@/frontend/reducer/user-reducer';

interface RouteParams extends Params {
  userId: string
};

const userClient: UserClient = new BackendUserClient();

export default function Page() {
  const [user, dispatch] = useReducer(userReducer, userInitialState);

  const router = useRouter();

  const params = useParams<RouteParams>();

  console.log(`User ID: ${params.userId}`);

  useEffect(() => {
    async function fetchUser(userId: string) {
      const user = await userClient.fetch(Number(userId));

      if (!user) return;

      dispatch({ type: 'SET_USER', payload: user })
    }

    fetchUser(params.userId);
  }, [params.userId]);

  const handleUpdateUser = async () => {
    const userData: User = {
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      weight: user.weight,
      smoker: user.smoker
    };

    const newUser = await userClient.create(user);

    if (!newUser) return;

    router.push(`/users/${params.userId}`);
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
          onChange={(e) => dispatch({
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

      <Button className="mt-3" variant="primary" type="button" onClick={handleUpdateUser}>
        Submit
      </Button>
    </Form>
  );
};
