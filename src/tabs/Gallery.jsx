import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    showButton: false,
  };

  hengleGetQuery = newQuery => {
    this.setState({ query: newQuery, images: [], page: 1 });
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      ImageService.getImages(query, page).then(data => this.setState(prevState => ({ images: [...prevState.images, ...data.photos], showButton: page < Math.ceil(data.total_results / 15) })));
    }
  }

  handleClick = event => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  }

  render() {
    const { images, showButton } = this.state;
    const { handleClick } = this;
    return (
      <>
        <SearchForm onSubmit={this.hengleGetQuery} />
        <Grid>
          {images.length > 0 && images.map(({ id, alt, avg_color, src }) => (<GridItem key={id} >
            <CardItem color={avg_color}>
              <img src={src.large} alt={alt} />
            </CardItem>
            </GridItem>))}
        </Grid>
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        {showButton && <Button onClick={handleClick}>Load more</Button>}
      </>
    );
  }
}
