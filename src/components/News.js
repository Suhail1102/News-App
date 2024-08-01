import React, { useState, useEffect} from "react";
import NewsItem from "./NewsItem";
 import Spinner from './Spinner';
 import PropTypes from 'prop-types'
 import InfiniteScroll from "react-infinite-scroll-component";

const News =(props) =>{
  const[ articles , setArticles]=useState([])
  const[ loading , setLoading]=useState(false)
  const[ page , setPage]=useState(1)
  const[ totalResults , setTotalResults]=useState(0)
  
 const  updateNews= async()=>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b3e271d8745a4f41be80907ada405d88&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    let parseData = await data.json();
    props.setProgress(50);
    console.log(parseData);
    setArticles(parseData.articles)
    setTotalResults(parseData.totalResults)
    setLoading(false)
    props.setProgress(100);
  };

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line 
  }, []);
    // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8f7f2d47672948ee9414288735342843&page=1&pageSize=${this.props.pageSize}`;
    //    this.setState({loading: true});
    // let data = await fetch(url);
    // let parseData = await data.json();
    // console.log(parseData);
    // this.setState({
    //   articles: parseData.articles,
    //   totalResults: parseData.totalResults,
    //   loading:false
    // });
  
//  const handleNextClick = async () => {
 
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b3e271d8745a4f41be80907ada405d88&page=${
    //   this.state.page + 1
    // }&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parseData = await data.json();
    // console.log(parseData);
    // this.setState({ articles: parseData.articles, page: this.state.page + 1 , loading: false});
    //    this.setState({
    // page: this.state.page + 1})
    // this.updateNews();   
         
  // };

//  const handlePrevClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b3e271d8745a4f41be80907ada405d88&page=${
    //   this.state.page - 1
    // }&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parseData = await data.json();
    // console.log(parseData);
    // this.setState({ articles: parseData.articles, page: this.state.page - 1 , loading: false });
    // this.setState( {page: this.state.page - 1 })
    // this.updateNews();
  // };

 const fetchMoreData = async() => {
    
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b3e271d8745a4f41be80907ada405d88&page=${page+1}&pageSize=${props.pageSize}`;
    setPage( page +1)
    setLoading(true)
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    setArticles(articles.concat(parseData.articles))
    setTotalResults(parseData.totalResults)
    setLoading(false)
    
  };
    return (
      <>
        <div className="my-3">
          <h1 className="text-center t-5 " style={{margin:"35px 0px" , marginTop:"65px"}}>News App - Top {props.category} Headlines</h1>
          {loading && <Spinner />}
          <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className=" row   ">
            {articles.map((element) => {
              return (
                <div className=" col-md-4 " key={element.url}>
                  <div className="my-3 ">
                  <NewsItem
                    title={element.title ? element.title : "title"}
                    description={
                      element.description ? element.description : " description"
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author?element.author : "unknown"}
                    date={element.publishedAt?element.publishedAt :" No time"}
                  />
                </div>
                </div>
              );
            })}
          </div>
          </div>
          </InfiniteScroll>
        </div>
        {/* /* <div className="container my-3 d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &laquo; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >=
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &raquo;
          </button>
        </div> */ }
      </>
    );
}


export default News;

News.defaultProps={
  country:"in",
  pageSize: 6,
  category:'general'
}

News.propTypes={
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}
