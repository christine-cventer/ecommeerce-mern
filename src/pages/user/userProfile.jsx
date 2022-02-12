import React from "react";
import Layout from "../Layout";
import { isUserSignedIn } from "../../authorizations";
import "../../styles/userProfileStyles.css";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

export default function UserProfile() {
  // Let's access the user data stored in local storage from the
  // isUserSignedIn function thru destructuring
  const {
    user: { name, email, role },
  } = isUserSignedIn();
  console.log("userData:", localStorage.getItem("token"));

  const profileLinks = () => {
    return (
      <div className="card">
        <h4>Your links</h4>
        <li className="list-group-item">
          <Link to="/card" className="nav-link">
            My Cart
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/update/profile" className="nav-link">
            Update profile
          </Link>
        </li>
      </div>
    );
  };

  return (
    <Layout title="Profile" description="User Information">
      {profileLinks()}
      <div className="userProfile">
        <h2 className="table-header">User Information</h2>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email address</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{name}</td>
              <td>{email}</td>
              <td>{role}</td>
            </tr>
          </tbody>
        </Table>{" "}
        <h2 className="purchase-history"> Purchase History</h2>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email address</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Layout>
  );
}
