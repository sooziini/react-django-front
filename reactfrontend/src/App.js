import React from 'react';
import './App.css';
import api from './api'
import PostView from './Components/PostView'

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      title: '',
      content: '',
      results: [],
    }
  }

  componentDidMount() {
    this.getPosts()
  }

  async getPosts() {
    const _results = await api.getAllPosts()
    this.setState({results: _results.data})
  }


  handlingChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handlingSubmit = async (event) => {
    event.preventDefault()  // event의 기본 기능 막음 (이 경우엔 새로고침 방지)
    let result = await api.createPost({title: this.state.title, content: this.state.content})
    
    // console.log("Complete", result)

    this.setState({title:'', content:''})
    this.getPosts()
  }

  hanglingDelete = async (id) => {
    await api.deletePost(id)
    this.getPosts()
  }

  render() {
    return (
      <div className="App">
        <Container maxWidth="md">

          <div className="PostSection">
            <Paper className="PostingPaper">
              <h2>"대나무숲🍃" 여러분의 생각을 마음껏 펼쳐보세요</h2>
              <form className="PostingForm" onSubmit={this.handlingSubmit}>

                <TextField 
                  required id="standard-required"
                  label="Title"
                  defaultValue=""
                  margin="normal"
                  name = "title"
                  value = {this.state.title}
                  onChange = {this.handlingChange}
                />

                <TextField
                  id="standard-multiline-flexible"
                  label="Content"
                  multiline
                  rowsMax={4}
                  margin="normal"
                  name = "content"
                  value={this.state.content}
                  onChange={this.handlingChange}
                />

                <Button variant="contained" color="primary" type="submit">Submit</Button>

              </form>
            </Paper>
          </div>

          <div className="ViewSection">
            <Grid container spacing={3}>
            {
              this.state.results.map((post) =>
                <Grid item sm>
                  <Card className={'card'}>
                    <CardContent>
                      <Typography component="h2">
                        <PostView id={post.id} title={post.title} content={post.content} key={post.id} />
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button color="primary" size="small" onClick={(event)=>this.hanglingDelete(post.id)}>Delete</Button>
                    </CardActions>
                  </Card>
                </Grid>
              )
            }
            </Grid>
          </div>

        </Container>
      </div>
    );
  }
}

export default App;
