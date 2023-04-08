import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
const Users = () => {
    const [users, setUsers]= useState([]);

    useEffect(() => {
        const fetchData = async ()=>{
            try {
                const apiUrl = "https://api.stackexchange.com/2.3/users?order=desc&sort=reputation&site=stackoverflow";

                // Make the API call
                const response = await fetch(apiUrl);
               const data = await response.json()
               if (data && data.items) {
                setUsers(data.items);
              }
            } catch (error) {
                console.log(error)
            }
        } 
        fetchData();
    },[]);

    console.log(users)
  return (
    <div>
        {users.items.map((item,index) =>(
            <Card style={{ width: '18rem' }} key={index}>
                <Card.Img variant="top" src={item.profile_image}/>
                <Card.Body>
                    <Card.Title>{item.display_name}</Card.Title>
                    <Card.Text>
                        {item.location }
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Reputation:{item.reputation}</ListGroup.Item>
                    <ListGroup.Item>userAccount:{ item.account_id}</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                    <Card.Link href={item.website_url}>Website url</Card.Link>
                    <Card.Link href={item.link}>Link</Card.Link>
                </Card.Body>
            </Card>
        ))}

    </div>

  )
}

export default Users