'use client'

import React, { useEffect, useReducer } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Table from 'react-bootstrap/Table';
import Link from 'next/link';
import Spacer from '@/frontend/component/spacer';
import { UserClient } from '@/frontend/client/user/user-client';
import BackendUserClient from '@/frontend/client/user/backend-user-client';
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

  const handleDeleteUser = async (userId: string) => {
    const confirmation = window.confirm('Are you sure you sure ?');

    if (!confirmation) return;

    const deleteSuccessful = await userClient.destroy(Number(userId));

    if (!deleteSuccessful) return;

    router.push('/users');
  };

  if (user == null) return;

  return (
    <>
      <h1>User</h1>

      <Link className="me-auto" href="/users">Back</Link>

      <Spacer />

      <div>
        <Link href={`/users/${params.userId}/edit`}>Edit</Link>
        <span> | </span>
        <Link href="" onClick={async () => await handleDeleteUser(params.userId)}>Delete</Link>
      </div>

      <Table variant='dark' size="md" responsive striped hover className="show-table">
        <tbody>
          <tr>
            <th>ID</th>
            <td>{user.id}</td>
          </tr>
          <tr>
            <th>First Name</th>
            <td>{user.firstName}</td>
          </tr>
          <tr>
            <th>Last Name</th>
            <td>{user.lastName}</td>
          </tr>
          <tr>
            <th>Age</th>
            <td>{user.age}</td>
          </tr>
          <tr>
            <th>Weight</th>
            <td>{user.weight}</td>
          </tr>
          <tr>
            <th>Smoker</th>
            <td>{user.smoker ? 'True' : 'False'}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
