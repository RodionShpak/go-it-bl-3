import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  hendleOnSubmit = event => {
    event.preventDefault();
    const {
      elements: { search },
    } = event.currentTarget;
    const searchValue = search.value.trim().toLowerCase();
    console.log(searchValue);
    if (!searchValue) {
      return;
    }
    this.props.onSubmit(searchValue);
  };

  render() {
    return (
      <SearchFormStyled onSubmit={this.hendleOnSubmit}>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch
          placeholder="What do you want to write?"
          name="search"
          required
          autoFocus
        />
      </SearchFormStyled>
    );
  }
}
