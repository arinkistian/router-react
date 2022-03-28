import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useLocation
} from 'react-router-dom';
import React from 'react';

export default function AuthExample() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<AuthButton />} />
        </Routes>
      
          <ul>
            <li>
              <Link to="/public">Public Page</Link>
            </li>
            <li>
              <Link to="/private">Private Page</Link>
            </li>
          </ul>

          <Routes>
            <Route path="/public" element={<PublicPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/private" element={<PrivateRoute />} >
              <Route element={<ProtectedPage />} />
            </Route>

        </Routes>
      </div>
    </Router>
  );
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

function AuthButton() {
  let navigate = useNavigate();

  return fakeAuth.isAuthenticated ? (
    <p>
      Welcome!{" "}
      <button onClick={() => {
        fakeAuth.signout(() => navigate("/"));
      }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}

function PrivateRoute({ children }) {
  return fakeAuth.isAuthenticated ? children : <Navigate to="/login" />;
}

function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3>Private</h3>;
}

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    fakeAuth.authenticate(() => {
      navigate(from, {replace: true});
    });
  };

  return (
    <div>
      <p> You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  );
}

// function App() {
//   return (
//     <Router>
//       <div>
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/topics">Topics</Link>
//           </li>
//         </ul>
//         <hr />

//         <Routes>
//           <Route path='/' element={<Home />} />
//           <Route path='/topics/*' element={<Topics/>}/>
//         </Routes>
//       </div>
//     </Router>
//   );
// }


// function Home() {
//   return (
//     <div>
//       <h2>Home</h2>
//     </div>
//   );
// }

// const Topics = (data)=> {
//   let { pathname, pathnameBase } = useMatch('/*');
//   return (
    
//     <div>
//       <h2>Topics</h2>
//       <ul>
//         <li>
//           {console.log(useMatch('/*'))}
//           <Link to={`${pathname}/Sate, Nasi goreng`}>Kuliner</Link>
//         </li>
//         <li>
//           <Link to={`${pathname}/Wisata alam, Museum`}>Travelling</Link>
//         </li>
//         <li>
//           <Link to={`${pathname}/Ibis, JW Marriot`}>Review Hotel</Link>
//         </li>
//       </ul>

//       <Routes>
//         <Route path={pathname} element={<h3>Please select a topic.</h3>} />
//         <Route path={`${pathnameBase}/:topicId`} element={<Topic/>} />
//       </Routes>
//     </div>
//   );
// }

// function Topic() {
//   let { topicId } = useParams();

//   return (
//     <div>
//       {console.log(useParams())}
//       <h3>{topicId}</h3>
//     </div>
//   );
// }


// export default App;