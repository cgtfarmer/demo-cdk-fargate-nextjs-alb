'use client'

import React, { useEffect, useReducer } from 'react';
import Table from 'react-bootstrap/Table';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import BackendUserClient from '@/frontend/client/user/backend-user-client';
import { UserClient } from '@/frontend/client/user/user-client';
import usersReducer, { usersInitialState } from '@/frontend/reducer/users-reducer';

const userClient: UserClient = new BackendUserClient();

export default function Page() {
  const [users, dispatch] = useReducer(usersReducer, usersInitialState);

  useEffect(() => {
    async function fetchUsers() {
      const users = await userClient.fetchAll();

      dispatch({ type: 'SET_USERS', payload: users })
    }

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId: number | undefined) => {
    const confirmation = window.confirm('Are you sure you want to delete this?');

    if (!confirmation) return;

    if (!userId) return;

    const deleteSuccessful = await userClient.destroy(userId);

    if (!deleteSuccessful) return;

    const users = await userClient.fetchAll();

    dispatch({ type: 'SET_USERS', payload: users })
  };

  const rows = [];
  for (let user of users) {
    const key = `${user.id}`;

    const row = (
      <tr key={key}>
        <td>{user.id}</td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.age}</td>
        <td>{user.weight}</td>
        <td>{user.smoker ? 'True' : 'False'}</td>
        <td className="d-flex gap-2">
          <Link href={`/users/${user.id}`}>Show</Link>
          <span> | </span>
          <Link href={`/users/${user.id}/edit`}>Edit</Link>
          <span> | </span>
          <Button variant="link" className="p-0" onClick={async () => await handleDeleteUser(user.id)}>Delete</Button>
        </td>
      </tr>
    );

    rows.push(row);
  }

  return (
    <>
      <h1 className="my-4 text-2xl">Users</h1>

      <Button variant="primary" href="/users/new">Create</Button>

      <Table responsive="md" variant='dark' striped hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Weight</th>
            <th>Smoker</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {rows}
        </tbody>
      </Table>
    </>
  );
}
