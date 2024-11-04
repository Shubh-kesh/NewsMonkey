import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

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

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  //this array will be used in state
  constructor(props) {
    super(props);
    console.log("hello, this is constructor from News component");
    // state for calling articles
    this.state = {
      articles: [],
      loading: true,
      page: 1,
    };
    document.title = `NewsMonkey- ${this.capitalizeFirstLetter(
      this.props.category
    )}`;
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1cc11b5c7d7b48809f350cd27e2d21ef&page=${this.props.page}&pageSize=${this.props.pageSize}`;
    //it will wait for response then execute
    //the code pauses on this line until the fetch request completes and the response is received.
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(75);
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      pagecount: Math.ceil(this.state.totalResults / this.props.pageSize),
      loading: true,
    });
    this.props.setProgress(100);
  }
//for infinite scrolling
  fetchMoreData=async()=>{
    this.setState({page: this.state.page+1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1cc11b5c7d7b48809f350cd27e2d21ef&page=${this.props.page}&pageSize=${this.props.pageSize}`;
    //it will wait for response then execute
    //the code pauses on this line until the fetch request completes and the response is received.
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles:this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      pagecount: Math.ceil(this.state.totalResults / this.props.pageSize),
      loading: false
  })
  }

  // it will run after render method run
  //asynchronous function that runs automatically when a component is first added (or "mounted") onto the screen.
  async componentDidMount() {
    this.updateNews();
  }

  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "35px 0px" }}>
          NewsMonkey- Top {this.capitalizeFirstLetter(this.props.category)}{" "} Headline</h1>
        {/* {this.state.loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={
            this.state.articles.length !== this.state.totalResults
          }
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
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
          </div>
        </InfiniteScroll>
      </>
    );
  }
}
