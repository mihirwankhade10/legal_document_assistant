import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function App() {
  // Initialize form state with default values
  const [formData, setFormData] = useState({
    date: "",
    landlordName: "",
    landlordAddress: "",
    tenantName: "",
    tenantAddress: "",
    propertyAddress: "",
    propertyDescription: "",
    rentAmount: "",
    dueDate: "",
    securityDepositAmount: "",
    utilities: "",
    startDate: "",
    noticePeriod: "",
    petsAllowed: "",
    governingLaw: "",
  });

  const [downloadLink, setDownloadLink] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Use spread operator to update form data
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send formData as JSON to the backend
    fetch("http://127.0.0.1:5000/api/generate_rental_agreement", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        // Check if the response contains a download link
        if (data.downloadLink) {
          // Update the download link state with the generated URL
          setDownloadLink(data.downloadLink);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

    // Function to handle clicking the "Download Agreement" button
    const handleDownloadClick = () => {
      // Trigger the download link programmatically
      if (downloadLink) {
        const a = document.createElement('a');
        a.href = downloadLink;
        a.download = 'rental_agreement.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    };

  return (
    <div className="App">
      <Container>
        <h1 className="mt-4 mb-4">Rental Agreement Generator</h1>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="date">
                <Form.Label>Date:</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="landlordName">
                <Form.Label>Landlord Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="landlordName"
                  value={formData.landlordName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="landlordAddress">
                <Form.Label>Landlord Address:</Form.Label>
                <Form.Control
                  type="text"
                  name="landlordAddress"
                  value={formData.landlordAddress}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="tenantName">
                <Form.Label>Tenant Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="tenantName"
                  value={formData.tenantName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="tenantAddress">
                <Form.Label>Tenant Address:</Form.Label>
                <Form.Control
                  type="text"
                  name="tenantAddress"
                  value={formData.tenantAddress}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="propertyAddress">
                <Form.Label>Property Address:</Form.Label>
                <Form.Control
                  type="text"
                  name="propertyAddress"
                  value={formData.propertyAddress}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="propertyDescription">
                <Form.Label>Property Description:</Form.Label>
                <Form.Control
                  type="text"
                  name="propertyDescription"
                  value={formData.propertyDescription}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="rentAmount">
                <Form.Label>Rent Amount:</Form.Label>
                <Form.Control
                  type="number"
                  name="rentAmount"
                  value={formData.rentAmount}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="dueDate">
                <Form.Label>Due Date:</Form.Label>
                <Form.Control
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="securityDepositAmount">
                <Form.Label>Security Deposit Amount:</Form.Label>
                <Form.Control
                  type="number"
                  name="securityDepositAmount"
                  value={formData.securityDepositAmount}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="utilities">
                <Form.Label>Utilities:</Form.Label>
                <Form.Control
                  type="text"
                  name="utilities"
                  value={formData.utilities}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="startDate">
                <Form.Label>Start Date:</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="noticePeriod">
                <Form.Label>Notice Period:</Form.Label>
                <Form.Control
                  type="number"
                  name="noticePeriod"
                  value={formData.noticePeriod}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="petsAllowed">
                <Form.Label>Pets Allowed:</Form.Label>
                <Form.Control
                  type="text"
                  name="petsAllowed"
                  value={formData.petsAllowed}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="governingLaw">
                <Form.Label>Governing Law:</Form.Label>
                <Form.Control
                  type="text"
                  name="governingLaw"
                  value={formData.governingLaw}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit" className="mt-3">
            Generate Agreement
          </Button>
        </Form>

        {/* Download Button */}
        {downloadLink && (
          <Button
            variant="success"
            className="mt-3"
            onClick={handleDownloadClick}
          >
            Download Agreement
          </Button>
        )}
      </Container>
    </div>
  );
}

export default App;
