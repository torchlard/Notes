class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      comments: DataSource.getComments()
    };
  }

  componentDidMount() {
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    this.setState({
      comments: DataSource.getComments()
    });
  }

  render() {
    return (
      <div>
        {this.state.comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    );
  }
}

class BlogPost extends React.Component {
  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      blogPost: DataSource.getBlogPost(props.id)
    }
  }

  componentDidMount(){
    DataSource.addChangeListener(this.handleChange)
  }

  componentWillUnmount(){
    DataSource.removeChangeListener(this.handleChange)
  }

  handleChange(){
    this.setState({
      blogPost: DataSource.getBlogPost(this.props.id)
    })
  }

  render(){
    return <TextBlock text={this.state.blogPost}/>
  }
  
}

// extract common behavior: subscribe to change ===>

const CommentListWithSubscription = withSubscription(
  CommentList, DataSource => DataSource.getComments()
)
const BlogPostWithSubscription = withSubscription(
  BlogPost, (DataSource, props) => DataSource.getBlogPost(props.id)
)

// 1st param: wrapped component
// 2nd param: get data we're interested, given dataSource and current props


function withSubscription(WrappedComponent, selectData) {
  // ...and returns another component...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    componentDidMount() {
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}


// Don't mutate original component
function logProps(WrappedComponent) {
  return class extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('Current props: ', this.props);
      console.log('Previous props: ', prevProps);
    }
    render() {
      // Wraps the input component in a container, without mutating it. Good!
      return <WrappedComponent {...this.props} />;
    }
  }
}


// instead of this
const EnhancedComponent = withRouter(connect(commentSelector)(WrappedComponent))

// can use compose
const enhance = compose(
  withRouter,
  connect(commentSelector)
)

const EnhancedComponent = enhance(WrappedComponent)










