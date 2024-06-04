import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Admins from './pages/Admins/Admins';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import CreateProject from './pages/CreateProject';
import CreateTeacher from './pages/CreateTeacher/CreateTeacher';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import ProductList from './pages/Inventory/ProductList/ProductList';
import Login from './pages/Login/Login';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Students from './pages/Students/Students';
import Tables from './pages/Tables';
import Teachers from './pages/Teachers/Teachers';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import Users from './pages/Users/Users';
import AddProduct from './pages/Inventory/AddProduct/AddProduct';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          path="/inventory/product-list"
          element={
            <>
              <PageTitle title="Inventory | Product List" />
              <ProductList />
            </>
          }
        />

        <Route
          path="/inventory/add-product"
          element={
            <>
              <PageTitle title="Inventory | Add Product" />
              <AddProduct/>
            </>
          }
        />

        <Route
          index
          element={
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />

        <Route
          path="/users/all-users"
          element={
            <>
              <PageTitle title="Users | All Users" />
              <Users />
            </>
          }
        />

        <Route
          path="/users/students"
          element={
            <>
              <PageTitle title="Users | Students" />
              <Students />
            </>
          }
        />
        <Route
          path="/users/teachers"
          element={
            <>
              <PageTitle title="Users | Teachers" />
              <Teachers />
            </>
          }
        />
        <Route
          path="/users/admins"
          element={
            <>
              <PageTitle title="Users | Admins" />
              <Admins />
            </>
          }
        />
        <Route
          path="/create-project"
          element={
            <>
              <PageTitle title="Project | Create Project" />
              <CreateProject />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />
        <Route
          path="/create-teacher"
          element={
            <>
              <PageTitle title="Create Teacher | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <CreateTeacher />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <PageTitle title="Login | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Login />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
