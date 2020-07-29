import React from 'react';
import './App.css';
import  HomePage  from './pages/homepage/homepage.component';
import  ShopPage  from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { Switch, Route, Redirect } from 'react-router-dom';
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.action';
import {selectCurrentUser} from './redux/user/user.selector'
import {createStructuredSelector} from 'reselect';
import CheckoutPage from './pages/checkout/checkout.component'

// const HatsPage = () => {
//   return (
//   <div>
//     <h1>HATS PAGE</h1>
//   </div>
//   );
  
// }

class App extends React.Component {
 
  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //this.setState({currentUser: user});
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          //console.log(snapShot.data())
          setCurrentUser({
              id:snapShot.id,
              ...snapShot.data()
          })///
        });
      }
      else {
        setCurrentUser(userAuth);
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage}></Route>
          <Route path='/shop' component={ShopPage}></Route>
          <Route exact path='/checkout' component={CheckoutPage}></Route>
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to ='/'/>) : (<SignInAndSignUpPage/>)}></Route>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps) (App);

