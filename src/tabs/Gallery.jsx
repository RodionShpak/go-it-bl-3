import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    showButton: false,
    isEmpty: false,
    error: ''
  };

  hengleGetQuery = newQuery => {
    
    this.setState({ query: newQuery, images: [], page: 1 , isEmpty: false, error: ''});
  };

  componentDidUpdate(_, prevState) {
    const { query, page} = this.state;
    
    if (prevState.query !== query || prevState.page !== page) {
      ImageService.getImages(query, page).then(data => {
        if (data.photos.length === 0) {
          this.setState({isEmpty: true}) 
        }
        this.setState(prevState => ({ images: [...prevState.images, ...data.photos], showButton: page < Math.ceil(data.total_results / 15) }))
      }).catch((error) => {
        this.setState({ error: error.message });
      }) 
      
    }
  }

  handleClick = event => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  }

  render() {
    const { images, showButton, isEmpty, error } = this.state;
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
        {isEmpty && <Text textAlign="center">Sorry. There are no images ... 😭</Text>}
        {error && (
          <Text textAlign="center">❌ Something went wrong - {error}</Text>
        )}

        {showButton && <Button onClick={handleClick}>Load more</Button>}
      </>
    );
  }
}
