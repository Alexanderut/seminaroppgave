import { db } from "./firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Styled components as previously defined
const Card = styled.div`
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: start;
  background-color: #f9f9f9;
`;

const Title = styled.p`
  font-size: 18px;
  color: #333;
  font-weight: bold;
  margin: 0 0 10px 0;
`;

const Detail = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0;
`;

// Styled component for the button for aesthetic consistency
const StyledButton = styled.button`
  padding: 8px 16px;
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export default function Students() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "students"));
      const dataList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(dataList);
      console.log(dataList);
    };
    fetchData();
  }, []);

  return (
    <div>
      {data.map((element) => (
        <Card key={element.id}>
          <Title>{element.name}</Title>
          <Detail>Status: {element.role}</Detail>
          <Detail>Email: {element.email}</Detail>
          <Link to={`/studenter/${element.id}`}>
            <StyledButton>Se mer om {element.name}</StyledButton>
          </Link>
        </Card>
      ))}
    </div>
  );
}
