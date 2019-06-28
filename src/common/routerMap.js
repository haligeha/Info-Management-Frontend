import Index from '../App';
import EmergencyPlan from '../routes/Emergency/Plan';
import Login from '../login/login';

export default [
  { path: "/", name: "App", component: Index },
  { path: "/emergency/plan", name: "EmergencyPlan", component: EmergencyPlan },
  { path: "/login", name: "Login", component: Login },
]