import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase/firebase';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  padding: 20px;
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #333;
`;

const Detail = styled.p`
  color: #666;
  font-size: 16px;
`;

const ErrorMsg = styled.div`
  color: red;
  font-size: 16px;
`;

const LoadingMsg = styled.div`
  font-size: 16px;
`;

export default function SingleStudent() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { studentId } = useParams(); // Using useParams to extract 'studentId' from the route

  useEffect(() => {
    console.log(studentId)
    const fetchStudent = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "students", studentId); // Using 'studentId' to get the document
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setStudent(docSnap.data());
        } else {
          setError('No such student exists!');
        }
      } catch (err) {
        setError('Error fetching student: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [studentId]);

  if (loading) {
    return <LoadingMsg>Loading...</LoadingMsg>;
  }

  if (error) {
    return <ErrorMsg>Error: {error}</ErrorMsg>;
  }

  return (
    <Container>
      {student ? (
        <>
          <Title>Student Details</Title>
          <Detail>Name: {student.name}</Detail>
          <Detail>Emal: {student.email}</Detail>
          <Detail>Rolle: {student.role}</Detail>
        </>
      ) : (
        <ErrorMsg>No student data available.</ErrorMsg>
      )}
    </Container>
  );
}
