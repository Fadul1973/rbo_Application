import React, { Component } from "react";
import AudioBookDataService from "../services/AudioBook_service";

export default class AudioBook extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeNo = this.onChangeNo.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getBook = this.getBook.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateBook = this.updateBook.bind(this);
    this.updateRequest = this.updateRequest.bind(this);
    this.updateRequestInfo = this.updateRequestInfo.bind(this);
    this.deleteBook = this.deleteBook.bind(this);

    this.state = {
      currentBook: {
      id: null,
      title: "",
      no: "",
      author: "",
      description: "",
      
      purchased: false,
      },
      message: "",
      message2: "",
      message3: ""
    };
  }

  componentDidMount() {
    
    this.getBook( this.props.match.params.id);
  }
 
  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentBook: {
          ...prevState.currentBook,
          title: title
        }
      };
    });
  }

  onChangeNo(e) {
    const no = e.target.value;
    
    this.setState(prevState => ({
      currentBook: {
        ...prevState.currentBook,
        no: no
      }
    }));
  }

    onChangeAuthor(e) {
    const author = e.target.value;
    
    this.setState(prevState => ({
      currentBook: {
        ...prevState.currentBook,
        author: author
      }
    }));
  }

   onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentBook: {
        ...prevState.currentBook,
        description: description
      }
    }));
  }

  getBook(id) {
    AudioBookDataService.get(id)
      .then(response => {
        this.setState({
          currentBook: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentBook.id,
      title: this.state.currentBook.title,
      no: this.state.currentBook.no,
      author: this.state.currentBook.author,
      description: this.state.currentBook.description,
      purchased: status
    };

    AudioBookDataService.update(this.state.currentBook.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentBook: {
            ...prevState.currentBook,
            purchased: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateBook() {
    AudioBookDataService.update(
      this.state.currentBook.id,
      this.state.currentBook
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Audio book was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateRequest() {
    AudioBookDataService.update(
      this.state.currentBook.id,
      this.state.currentBook
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message2: "Your request has been send to be authorised!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateRequestInfo() {
    AudioBookDataService.update(
      this.state.currentBook.id,
      this.state.currentBook
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message3: "Please add more information about the book!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteBook() {    
    AudioBookDataService.delete(this.state.currentBook.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/audiobooks') 
      })
      .catch(e => {
        console.log(e);
      });
  }

 render() {
    const { currentBook } = this.state;

    return (
      <div>
        {currentBook ? (
          <div className="edit-form">
            <h4>Audio Book</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentBook.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="no">ISBN</label>
                <input
                  type="text"
                  className="form-control"
                  id="no"
                  value={currentBook.no}
                  onChange={this.onChangeNo}
                />
              </div>
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  className="form-control"
                  id="author"
                  value={currentBook.author}
                  onChange={this.onChangeAuthor}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentBook.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              
              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentBook.purchased ? "purchased" : "Pending"}
              </div>
            </form>

            {currentBook.purchased ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPurchase
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Purchase
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteBook}
            >
              Cancel Request
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateBook}
            >
              Update
            </button>
            <p>{this.state.message}</p>

             <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateRequest}
            >
              Ask For Authorisation!
            </button>
            <p>{this.state.message2}</p>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateRequestInfo}
            >
              Add More information!
            </button>
            <p>{this.state.message3}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on an Audio Book...</p>
          </div>
        )}
      </div>
    );
  }
}