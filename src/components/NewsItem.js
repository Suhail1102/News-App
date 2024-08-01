import React from 'react'

function NewsItem(props) {
  
    let {title , description ,imageUrl , newsUrl , author , date}= props;
    return (
      <>
      <div className="card " data-aos="fade-up">
  <img src={imageUrl} className="card-img-top  " alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}..</h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
    <a href={newsUrl} target='blank' className="btn  btn-sm btn-dark " alt="1">Read more</a>
  </div>
</div>
      </>
    )
  
}

export default NewsItem