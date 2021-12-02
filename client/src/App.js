import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminProfile from './screens/AdminProfile';
import CreateCategory from './screens/CreateCategory';
import Login from './screens/Login';
import Profile from './screens/Profile';
import Register from './screens/Register';
import CreatePost from './screens/CreatePost';
import MyPosts from './screens/MyPosts';
import AdminPostList from './screens/AdminPostList';
import EditPost from './screens/EditPost';
import HomePage from './screens/HomePage';
import AdminUserList from './screens/AdminUserList';
import AdminCategories from './screens/AdminCategories';
import SinglePost from './screens/SinglePost';

const App = () => {
  return (
    <Router>
      <Header />

      <main className="pt-3 pb-1">
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/post/:id" component={SinglePost} />
        <Route exact path="/create_post" component={CreatePost} />
        <Route exact path="/edit_post/:id" component={EditPost} />
        <Route exact path="/my_posts" component={MyPosts} />
        <Route exact path="/admin/users" component={AdminUserList} />
        <Route exact path="/admin/user/:id/profile" component={AdminProfile} />
        <Route exact path="/admin/posts" component={AdminPostList} />
        <Route
          exact
          path="/admin/posts/:pageNumber"
          component={AdminPostList}
        />
        <Route exact path="/admin/create_category" component={CreateCategory} />
        <Route exact path="/admin/categories" component={AdminCategories} />
        <Route exact path="/search/:keyword" component={HomePage} />
        <Route exact path="/page/:pageNumber" component={HomePage} />
        <Route
          exact
          path="/search/:keyword/page/:pageNumber"
          component={HomePage}
        />
        <Route exact path="/" component={HomePage} />
      </main>
      <Footer />
    </Router>
  );
};

export default App;
