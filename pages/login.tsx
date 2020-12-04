import Link from 'next/link'
import LoginForm from '../components/forms/SignInForm'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase'
const LoginPage: React.FC = () => {
    // Configure FirebaseUI.
    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        signInSuccessUrl: '/signedIn',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        ],
    }

    return (
        <section className="absolute w-full top-0">
            <div
                className="absolute top-0 w-full h-full bg-gray-900"
                // style={{
                //     backgroundImage: `url("/food-bg.jpeg")`,
                //     backgroundRepeat: 'no-repeat',
                //     backgroundSize: 'cover'
                // }}
            ></div>
            <div className="container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-5/12 px-4 pt-32">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                            <div className="rounded-t mb-0 px-6 py-6">
                                <div className="text-center mb-3">
                                    <h2 className="logo-text font-serif text-5xl">
                                        BYTE
                                    </h2>
                                    <h6 className="text-gray-600 text-sm font-bold">
                                        Sign in with
                                    </h6>
                                </div>
                                <div className="btn-wrapper text-center flex-row">
                                    <StyledFirebaseAuth
                                        uiConfig={uiConfig}
                                        firebaseAuth={firebase.auth()}
                                    />
                                </div>
                                <hr className="mt-6 border-b-1 border-gray-400" />
                            </div>
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <div className="text-gray-500 text-center mb-3 font-bold">
                                    <small>Or sign in with credentials</small>
                                </div>
                                <LoginForm />
                            </div>
                        </div>
                        <div className="flex flex-wrap mt-6">
                            <div className="w-1/2">
                                <a href="#pablo" className="text-gray-300">
                                    <small>Forgot password?</small>
                                </a>
                            </div>
                            <div className="w-1/2 text-right">
                                <a href="#pablo" className="text-gray-300">
                                    <small>Create new account</small>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer  */}
        </section>
    )
}
export default LoginPage
