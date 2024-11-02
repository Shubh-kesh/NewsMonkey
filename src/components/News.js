import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export default class News extends Component {
  //defaultProps is a way to set default values for props in case they aren’t provided by the parent component
  static defaultProps = {
    pageSize: 9,
    country: "us",
    category: "sports",
  };

  //propTypes is used to validate the types of props that are passed to the component
  //If a different type is passed for any of these props, React will issue a warning in the console. This helps ensure consistency and reliability in how the component is used.
  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
  };
  //this array will be used in state
  constructor() {
    super();
    console.log("hello, this is constructor from News component");
    // state for calling articles
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1cc11b5c7d7b48809f350cd27e2d21ef&page=${this.props.page}&pageSize=${this.props.pageSize}`;
    //it will wait for response then execute
    //the code pauses on this line until the fetch request completes and the response is received.
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      pagecount: Math.ceil(this.state.totalResults / this.props.pageSize),
      loading: false,
    });
  }

  // it will run after render method run
  //asynchronous function that runs automatically when a component is first added (or "mounted") onto the screen.
  async componentDidMount() { this.updateNews()}

  // math.ceil function will give the largest integer value
  handleNextClick = async () => {
    console.log("Next");
    // // if (this.state.page + 1 > this.state.pagecount){

    // // }
    // // else{
    // if (!(this.state.page + 1 > this.state.pagecount)){
    //   // this if is also not required because button is already disabled
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1cc11b5c7d7b48809f350cd27e2d21ef&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data =await fetch(url)
    // let parsedData= await data.json();
    // this.setState({
    //   page : this.state.page +1,
    //   articles: parsedData.articles,
    //   loading:false
    // })
    // }
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  handlePrevClick = async () => {
    // console.log("Previous")
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1cc11b5c7d7b48809f350cd27e2d21ef&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
    // this.setState({loading:true})
    // let data =await fetch(url);
    // let parsedData= await data.json();
    // this.setState({
    //   page : this.state.page-1,
    //   articles: parsedData.articles,
    //   loading:false
    // })
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: "35px 0px" }}>
          NewsMonkey- Top Headline
        </h1>
        {/* // when this.state.loading is true then show spineer */}
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col md-3" key={element.url}>
                  <NewsItem
                    title={
                      element.title
                        ? element.title.slice(0, 45)
                        : "No title available"
                    }
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : "No description available"
                    }
                    imageUrl={element.urlToImage}
                    // {/* <NewsItem title={element.title ? element.title:"No title available"} description={element.description ? element.description:"No description available"} imageUrl={element.urlToImage} */}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={
                      element.source.name ? element.source.name : "Unknown"
                    }
                  />
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            onClick={this.handlePrevClick}
            type="button"
            className="btn btn-dark"
          >
            &laquo; Previous
          </button>
          <button
            type="button"
            disabled={this.state.page + 1 > this.state.pagecount}
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &raquo;
          </button>
        </div>
      </div>
    );
  }
}
