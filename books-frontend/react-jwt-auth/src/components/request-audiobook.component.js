import React, { Component } from "react";
import AudioBookDataService from "../services/AudioBook_service"

export default class RequestAudioBook extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeNo = this.onChangeNo.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveBook = this.saveBook.bind(this);
    this.newBook = this.newBook.bind(this);

      this.state = {
      id: null,
      title: "",
      no: "",
      author: "",
      description: "",
      
      purchased: false,

      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeNo(e) {
    this.setState({
      no: e.target.value
    });
  }
  
      onChangeAuthor(e) {
    this.setState({
      author: e.target.value
    });
  }

     onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveBook() {
   
    var data = {
      title: this.state.title,
      no: this.state.no,
      author: this.state.author,
      description: this.state.description,
    };

    AudioBookDataService.create(data)
      .then(response => {
          this.setState({
          id: response.data.id,
          title: response.data.title,
          no: response.data.no,
          author: response.data.author,
          description: response.data.description,
          
          purchased: response.data.purchased,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newBook() {
      this.setState({
      id: null,
      title: "",
      no: "",
      author: "",
      description: "",
      
      purchased: false,

      submitted: false
    });
  }

  render() {
     return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted your request successfully!</h4>
            <button className="btn btn-success" onClick={this.newBook}>
              RequestAudioBook
            </button>
          </div>
         ) : (
              
             <div>                
              <div className="form-group">
                  <h4>Enter AudioBook Information</h4>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                  onChange={this.onChangeTitle}  
                  name="title"                                 
              />
                </div>
                <div className="form-group">
              <label htmlFor="no">ISBN</label>
              <input
                type="text"
                className="form-control"
                id="no"
                required
                value={this.state.no}
                onChange={this.onChangeNo}     
                name="no"
              />
                </div>
                <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                className="form-control"
                id="author"
                required
                value={this.state.author}
                onChange={this.onChangeAuthor}                    
                name="author"
              />
               </div> 
                <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
              </div>                
              <button onClick={this.saveBook} className="btn btn-success">
              Create request
              </button>             
               </div>          
        )}
      </div>
    );
  }
}


