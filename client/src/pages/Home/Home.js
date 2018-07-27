import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Container from "../../components/Container";
import Panel from "../../components/Panel";
import { Input, FormBtn } from "../../components/Form";
import { ArticleList, ArticleListItem } from "../../components/Articles";
import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/SaveBtn";


class Home extends Component {
  state = {
    articles: [],
    topic: "",
    startDate: "",
    endDate: ""
  };

  componentDidMount() {
    this.loadSavedArticles();
  }
  loadSavedArticles = () => {
    API.getSavedArticles()
      .then(res =>
        this.setState({ article: res.data, title: "", url: "", date: "" })
      )
      .catch(err => console.log(err));
  };
  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadSavedArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state.topic, this.state.startDate, this.state.endDate);
    API.getArticles(
       this.state.topic,
       this.state.startDate,
       this.state.endDate
      )
        .then(res => this.setState({articles: res.data}))
        .catch(err => console.log(err));
    }
  
  render() {
    return (
        <Container fluid>
       <Header>
            </Header>
            <Panel title="Search">
              <form>
              <Input
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
                placeholder="Topic (required)"
              />
              <Input
                value={this.state.startDate}
                onChange={this.handleInputChange}
                name="startDate"
                placeholder="Start Date (YYYYMMDD)"
              />
               <Input
                value={this.state.endDate}
                onChange={this.handleInputChange}
                name="endDate"
                placeholder="End Date (YYYYMMDD)"
              />
              <FormBtn
                disabled={!(this.state.topic)}
                onClick={this.handleFormSubmit}
              >Submit 
              </FormBtn>
            </form>
              </Panel>
              <Panel>
               <ArticleList>
                {this.state.articles.map(article => {
                 return (
                  <ArticleListItem 
                    title={article.headline}
                    date={article.pub_date}
                    url={article.web_url}
                  />
                 );
                })}
                <SaveBtn onClick={() => this.saveArticle()} />
                  <ArticleListItem/>
                </ArticleList>
              </Panel>
              <Panel title=
              "Saved">              
              <ArticleList>
              {this.state.articles.map(article => {
                return (
                <ArticleListItem 
                key={article._id}
                title={article.headline}
                date={article.pub_date}
                url={article.web_url}
              />
                );
              })}
                {/* <DeleteBtn onClick={() => this.deleteArticle(article._id)} /> */}
                </ArticleList>
              </Panel>
              </Container>
    )};
  }      
          
export default Home;