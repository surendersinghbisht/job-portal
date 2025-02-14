import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppLayout from "./layout/app-layout"
import Job from "./pages/Job"
import JobListing from "./pages/job-listing"
import PostJobs from "./pages/post-jobs"
import SavedJobs from "./pages/saved-jobs"
import Myjobs from "./pages/my-jobs"
import LandingPage from "./pages/landing-page"
import OnBoarding from "./pages/OnBoarding"
import { ThemeProvider } from "./components/theme-provider"
import "./App.css";
import ProtectedRoute from "./components/protected-route"

function App() {
  
const router = createBrowserRouter([
 { 
  element: <AppLayout />,
  children : [
    {
      path: '/',
      element: <LandingPage />
    },
    {
path: 'onboarding',
element:(
<ProtectedRoute><OnBoarding /></ProtectedRoute>
) 
    },
   {
     path : '/jobs',
     element: (<ProtectedRoute><JobListing /></ProtectedRoute>) ,
    },
    {
      path : '/job/:id',
      element: (<ProtectedRoute><Job /></ProtectedRoute>) ,
     },
     {
      path : '/post-job',
      element:(<ProtectedRoute><PostJobs /></ProtectedRoute>) ,
     },
     {
      path : '/saved-jobs',
      element: (<ProtectedRoute><SavedJobs /></ProtectedRoute>) ,
     },
  ]
}
])

  return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider  router = {router} />
    </ThemeProvider>
  )
}

export default App
