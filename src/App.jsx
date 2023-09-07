import { useState, useEffect} from 'react'
import './App.css'

function App() {
 const [contacts, setContacts] = useState([]) ;
 const [hash, setHash] = useState(window.location.hash.slice(1)*1) ;

 useEffect(() => {
   const fetchData = async() => {  
     const response = await fetch('https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users') ;
     const json = await response.json();
     setContacts(json);
     console.log(json);
     }
     fetchData();
 }, []);

 useEffect(() => {
   window.addEventListener('hashchange', () => {
    setHash(window.location.hash.slice(1)*1);
   });
 }, []);

 const contact = contacts.find( contact => hash === contact.id);
 console.log(contact)

  return (
    <>
      <h1> Constact List {contacts.length} </h1>
      <hr />
      <ul>
        {
        contacts.map( contact => {
          return (
            <li key={contact.id}> 
            <a href={`#${contact.id === hash ? '':contact.id}`}> {contact.name} 
            </a> 
            </li>
          );
        })
        }
      </ul>
      <hr />
      { contact ? (<p>{contact.email}</p>) : null }
      { contact ? (<p>{contact.company.name}</p>) : null }
      { contact ? (<p>{contact.phone}</p>) : null }
    </>
  )
}

export default App
