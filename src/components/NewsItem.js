import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title, description,imageUrl,newsUrl, author, date, source}= this.props;
    //to convert date in GMT format, (new Date(date) will give date in array format and we can extract through functino .GMTString(), similarily for d.getDate(). d.getSeconds() etc.
    let GMTdate=new Date(date).toGMTString();
    return (
      <div className='my-3'>
        <div className="card" style={{width: "18rem"}}>
        <span className="position-absolute top-0 translation-middle badge rounded-pill bg-danger">{source}</span>
          {/* //when image url is null then it will given url else imageurl */}
        <img src={!imageUrl?"https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2034632744.jpg?c=16x9&q=w_800,c_fill":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{title}...  </h5>
              <p className="card-text">{description}...</p>
              <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} at {GMTdate}</small></p>
              <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}


// target='_blank' will open in new window