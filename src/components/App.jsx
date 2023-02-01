import { useState, useEffect } from 'react';
// import { Component } from 'react';
import { nanoid } from 'nanoid';

import { GlobalStyle } from './GlobalStyles';
import { Wrapper, Title, Caption } from './App.styled';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    return contacts ? contacts : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const createContactItem = ({ name, number }) => {
    const isIncludesName = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (!isIncludesName) {
      setContacts(prevState => {
        const contact = {
          id: nanoid(),
          name,
          number,
        };
        return [contact, ...prevState];
      });
    } else alert(`${name} is already in contacts`);
  };

  const changeFilter = ({ target }) => setFilter(target.value);

  const filterContactItem = () => {
    const normalizedFilter = filter.toLowerCase();
    const filterItem = contacts.filter(({ name }) => name.toLowerCase().includes(normalizedFilter));
    return filterItem;
  };

  const deleteContactItem = itemId => {
    setContacts(prevState => prevState.filter(contact => contact.id !== itemId));
  };

  return (
    <Wrapper>
      <GlobalStyle />
      <Title>Phonebook</Title>
      <ContactForm onSubmit={createContactItem} />
      <Caption>Contacts</Caption>
      <Filter value={filter} onChange={changeFilter} />
      {contacts.length > 0 && (
        <ContactList items={filterContactItem()} onDelete={deleteContactItem} />
      )}
    </Wrapper>
  );
};

// export class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidMount() {
//     const contactsSave = JSON.parse(localStorage.getItem('contacts'));
//     if (contactsSave) {
//       this.setState({ contacts: contactsSave });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const { contacts } = this.state;
//     if (contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(contacts));
//     }
//   }

//   createContactItem = ({ name, number }) => {
//     const isIncludesName = this.state.contacts.some(
//       contact => contact.name.toLowerCase() === name.toLowerCase()
//     );

//     if (!isIncludesName) {
//       this.setState(prevState => ({
//         contacts: [{ id: nanoid(), name, number }, ...prevState.contacts],
//       }));
//     } else alert(`${name} is already in contacts`);
//   };

//   deleteContactItem = itemId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== itemId),
//     }));
//   };

//   changeFilter = event => {
//     const { value } = event.currentTarget;
//     this.setState({
//       filter: value,
//     });
//   };

//   filterContactItem = () => {
//     const { contacts, filter } = this.state;
//     const normalizedFilter = filter.toLowerCase();
//     const filterItem = contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//     return filterItem;
//   };

//   render() {
//     const { contacts, filter } = this.state;

//     return (
//       <Wrapper>
//         <GlobalStyle />
//         <Title>Phonebook</Title>
//         <ContactForm onSubmit={this.createContactItem} />
//         <Caption>Contacts</Caption>
//         <Filter value={filter} onChange={this.changeFilter} />
//         {contacts.length > 0 && (
//           <ContactList items={this.filterContactItem()} onDelete={this.deleteContactItem} />
//         )}
//       </Wrapper>
//     );
//   }
// }
