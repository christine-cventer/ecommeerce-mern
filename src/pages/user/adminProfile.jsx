import React from "react";
import Layout from "../Layout";
import { isUserSignedIn } from "../../authorizations";
import "../../styles/userProfileStyles.css";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const adminLinks = () => {
    return (
      <div className="card">
        <h4>Your links</h4>
        <li className="list-group-item">
          <Link to="/create/category" className="nav-link">
            Categories
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/create/products" className="nav-link">
            Create products
          </Link>
        </li>
      </div>
    );
  };

  return (
    <Layout title="Profile" description="User Information">
      {adminLinks()}
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
              <td>{isUserSignedIn().user.name}</td>
              <td>{isUserSignedIn().user.email}</td>
              <td>{isUserSignedIn().user.role}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Layout>
  );
}
