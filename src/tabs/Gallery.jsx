import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
  };

  hengleGetQuery = newQuery => {
    this.setState({ query: newQuery });
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      ImageService.getImages(query, page).then(data => console.log(data));
    }
  }
  render() {
    return (
      <>
        <SearchForm onSubmit={this.hengleGetQuery} />
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}
