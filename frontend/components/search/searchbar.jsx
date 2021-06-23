import React from 'react';


class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: this.props.filters,
      saveSearch: false,
      searchId: '',
      searchTitle: "My Saved Search"

    };

    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e, filter, func) {
    func(filter, e.currentTarget.value);
  }

  handleClick(e) {
    let newSearch = {
      max_price: this.state.filters.maxPrice,
      max_sqft: this.state.filters.maxSqft ,
      min_baths: this.state.filters.minBaths,
      min_beds: this.state.filters.minBeds,
      min_price: this.state.filters.minPrice,
      title: this.state.searchTitle,
      query: this.state.filters.query
    };
    
    if (this.state.searchId.length === 0) {
      this.props.createSearch(newSearch).then(res => {
        this.setState({ 
          saveSearch: true,
          searchId: res.search.search_record.id
        });
      });
    } else if (this.state.saveSearch) {
      newSearch["id"] = this.state.searchId;
      this.props.updateSearch(newSearch).then(res => {
        this.setState({ saveSearch: false });
      });
    } else {
      this.setState({ saveSearch: true });
    }
  }

  update(field) {
    if (field === "title") {
      return (e) => this.setState({ searchTitle: e.currentTarget.value });
    } else {
      return (
        (e) => {
          this.setState({
            filters:{ 
              maxPrice: this.state.filters.maxPrice,
              maxSqft: this.state.filters.maxSqft,
              minBaths: this.state.filters.minBaths,
              minBeds: this.state.filters.minBeds,
              minPrice: this.state.filters.minPrice,
              query: e.currentTarget.value 
            }
          });
        }
      );
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.updateFilter( "query", this.state.filters.query );
  }

  render() {
    console.log(this.state.searchTitle);
    const sSDropdown = this.state.saveSearch ? 
      <>
        <div className="ss-dropdown-screen" onClick={() => this.setState({ saveSearch: false })}>
        </div>
        <div className="ss-dropdown">
          <nav className="ss-dropdown-nav">
            <div className="ss-dropdown-close" onClick={() => this.setState({ saveSearch: false })}>x</div>
          </nav>
          <form onSubmit={this.handleClick}>
            <label > Name your search
              <input type="text" placeholder={this.state.searchTitle} value={this.state.searchTitle} onChange={this.update("title")} />
            </label>
            <button type="submit">Update</button>
          </form>
        </div> 
      </>:
      <></>

    return (
      <nav className="lst-searchbar">
        <form className="lst-searchbar-container" onSubmit={this.handleSubmit}>
          <input type="search" placeholder="Enter an address, city, or Zip code" className="lst-searchbar-inpt" value={this.state.filters.query} onChange={this.update("query")} />
          <button id="lst-search-submit"></button>
        </form>

        <label htmlFor=""> 
          <select className="lst-dropdown" value={this.props.filters.minPrice} onChange={(e) => this.handleChange(e, 'minPrice', this.props.updateFilter)}>
            <option value="300000">Price</option>
            <option value="400000">$400,000+</option>
            <option value="500000">$500,000+</option>
            <option value="600000">$600,000+</option>
            <option value="700000">$700,000+</option>
            <option value="800000">$800,000+</option>
            <option value="900000">$900,000+</option>
          </select>
        </label>
        <label htmlFor=""> 
          <select className="lst-dropdown" value={this.props.filters.minBeds} onChange={(e) => this.handleChange(e, 'minBeds', this.props.updateFilter)}>
            <option value="0">Beds</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </label>
        <label htmlFor=""> 
          <select className="lst-dropdown" value={this.props.filters.minBaths} onChange={(e) => this.handleChange(e, 'minBaths', this.props.updateFilter)}>
            <option value="0">Baths</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </label>
        <label htmlFor=""> 
          <select className="lst-dropdown" value={this.props.filters.minPrice} onChange={(e) => this.handleChange(e, 'minSqft', this.props.updateFilter)}>
            <option value="500">Sqft</option>
            <option value="1000">1000+</option>
            <option value="2000">2000+</option>
            <option value="3000">3000+</option>
            <option value="4000">4000+</option>
            <option value="5000">5000+</option>
          </select>
        </label>
        <button className="save-search" onClick={this.handleClick}>Save Search</button>
        {sSDropdown}
      </nav>

    )
  }
}


export default SearchBar;