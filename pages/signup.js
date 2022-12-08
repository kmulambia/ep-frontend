import React from "react";
import Link from "next/link";
import { withRouter } from 'next/router'
import Layout from "../components/layouts/default.layout";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { withTranslation } from 'next-i18next';
import { componentKey } from "../services/helpers.service"
import Swal from 'sweetalert2/dist/sweetalert2.js';
//STORES , COMPONETS AND FROMS 
import useUserStore from "../services/store/user.store";
import SignupForm from "../components/pages/auth/forms/signup.form";
import LoadingWidget from "../components/widgets/loading.widget"
import FooterComponent from "../components/pages/auth/footer.component";
//INITIALISE
const userStore = new useUserStore();
//PAGE
class Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            showPassword: false,
            open: false,
        };
    }
    signUp = (data) => {
        this.setState({ loading: true });
        userStore.
            signup(data)
            .then((result) => {
                Swal.fire({
                    titleText: this.props.t('status.success', { ns: 'common' }),
                    icon: 'success',
                    showCancelButton: false,
                    showConfirmButton: true,
                    html: this.props.t('signup_page.notification.success', { ns: 'auth' }),
                    cancelButtonText: this.props.t('forms.dismiss', { ns: 'common' }),
                    confirmButtonText: this.props.t('forms.okay', { ns: 'common' }),
                    buttonsStyling: false,
                    allowOutsideClick: false,
                    customClass: {
                        icon: '',
                        title: 'text-red-400',
                        container: 'text-xs text-red-200',
                        actions: 'flex space-x-2',
                        confirmButton: 'inline-flex justify-center rounded-md border border-gray-300 bg-white px-10 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm',
                        cancelButton: 'inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-10 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm'
                    }
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                       this.props.router.push("/signin")
                    } 
                })
            })
            .catch((error) => {
                switch (error.statusCode) {
                    case 401:

                        Swal.fire({
                            position: 'top-end',
                            toast: true,
                            titleText: this.props.t('status.failed', { ns: 'common' }),
                            showCancelButton: true,
                            showConfirmButton: false,
                            color: '#ad4545',
                            icon: 'error',
                            width: 450,
                            html: this.props.t('signup_page.notification.failed_invalid_data', { ns: 'auth' }),
                            cancelButtonText: this.props.t('forms.dismiss', { ns: 'common' }),
                            confirmButtonText: this.props.t('forms.okay', { ns: 'common' }),
                            buttonsStyling: false,
                            customClass: {
                                container: 'text-xs text-danger-200',
                                actions: 'space-x-2',
                                confirmButton: 'capitalize inline-flex items-center font-semibold bg-white px-3 py-2 text-sm font-medium leading-4 text-danger-700  rounded-sm focus:outline-none hover:bg-danger-100 focus:ring-2 focus:ring-danger-500 focus:ring-offset-2',
                                cancelButton: ' capitalize inline-flex items-center font-semibold bg-white px-3 py-2 text-sm font-medium leading-4 text-danger-700  rounded-sm focus:outline-none hover:bg-danger-100 focus:ring-2 focus:ring-danger-500 focus:ring-offset-2'
                            }
                        })

                        break;
                    case 409:

                        Swal.fire({
                            position: 'top-end',
                            toast: true,
                            titleText: this.props.t('status.failed', { ns: 'common' }),
                            showCancelButton: true,
                            showConfirmButton: false,
                            color: '#ad4545',
                            icon: 'error',
                            width: 450,
                            html: this.props.t('signup_page.notification.failed_duplicate_email', { ns: 'auth' }),
                            cancelButtonText: this.props.t('forms.dismiss', { ns: 'common' }),
                            confirmButtonText: this.props.t('forms.okay', { ns: 'common' }),
                            buttonsStyling: false,
                            customClass: {
                                container: 'text-xs text-danger-200',
                                actions: 'space-x-2',
                                confirmButton: 'capitalize inline-flex items-center font-semibold bg-white px-3 py-2 text-sm font-medium leading-4 text-danger-700  rounded-sm focus:outline-none hover:bg-danger-100 focus:ring-2 focus:ring-danger-500 focus:ring-offset-2',
                                cancelButton: ' capitalize inline-flex items-center font-semibold bg-white px-3 py-2 text-sm font-medium leading-4 text-danger-700  rounded-sm focus:outline-none hover:bg-danger-100 focus:ring-2 focus:ring-danger-500 focus:ring-offset-2'
                            }
                        })

                        break;
                    default:
                  
                        Swal.fire({
                            position: 'top-end',
                            toast: true,
                            titleText: this.props.t('status.failed', { ns: 'common' }),
                            showCancelButton: true,
                            showConfirmButton: false,
                            color: '#ad4545',
                            icon: 'error',
                            width: 450,
                            html: this.props.t('signup_page.notification.failed_bad_network', { ns: 'auth' }),
                            cancelButtonText: this.props.t('forms.dismiss', { ns: 'common' }),
                            confirmButtonText: this.props.t('forms.okay', { ns: 'common' }),
                            buttonsStyling: false,
                            customClass: {
                                container: 'text-xs text-danger-200',
                                actions: 'space-x-2',
                                confirmButton: 'capitalize inline-flex items-center font-semibold bg-white px-3 py-2 text-sm font-medium leading-4 text-danger-700  rounded-sm focus:outline-none hover:bg-danger-100 focus:ring-2 focus:ring-danger-500 focus:ring-offset-2',
                                cancelButton: ' capitalize inline-flex items-center font-semibold bg-white px-3 py-2 text-sm font-medium leading-4 text-danger-700  rounded-sm focus:outline-none hover:bg-danger-100 focus:ring-2 focus:ring-danger-500 focus:ring-offset-2'
                            }
                        })

                }

            })
            .finally(() => {
                this.setState({ loading: false });
            });

    }
    componentDidMount() {
    }
    render() {
        return (
            <>
                <LoadingWidget loading={this.state.loading} />
                <div>
                    <div className="bg-white  overflow-hidden sm:px-6 lg:px-8 lg:py-24">
                        <div className="relative max-w-xl mx-auto">
                            <svg
                                className="absolute left-full transform translate-x-1/2"
                                width={404}
                                height={404}
                                fill="none"
                                viewBox="0 0 404 404"
                                aria-hidden="true"
                            >
                                <defs>
                                    <pattern
                                        id="85737c0e-0916-41d7-917f-596dc7edfa27"
                                        x={0}
                                        y={0}
                                        width={20}
                                        height={20}
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                                    </pattern>
                                </defs>
                                <rect width={404} height={404} fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
                            </svg>
                            <svg
                                className="absolute right-full bottom-0 transform -translate-x-1/2"
                                width={404}
                                height={404}
                                fill="none"
                                viewBox="0 0 404 404"
                                aria-hidden="true"
                            >
                                <defs>
                                    <pattern
                                        id="85737c0e-0916-41d7-917f-596dc7edfa27"
                                        x={0}
                                        y={0}
                                        width={20}
                                        height={20}
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                                    </pattern>
                                </defs>
                                <rect width={404} height={404} fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
                            </svg>
                            <div className="text-center">
                                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:tracking-tight">
                                    {this.props.t('signup_page.title', { ns: 'auth' })}
                                </h2>
                                <p className="mt-4 text-lg leading-6 text-gray-500">

                                </p>
                            </div>
                            <div className="mt-12" >
                                {/*signup form */}
                                <SignupForm signUp={this.signUp} />
                                {/***/}
                            </div>
                            <div className="mt-12">
                                <Link href="/signin">
                                    <a className="font-medium text-primary-600 hover:text-primary-500">
                                        {this.props.t('navigation.back_to_signin', { ns: 'common' })}
                                        <span aria-hidden="true"> &rarr;</span>
                                    </a>
                                </Link>
                            </div>
                            <div className="mt-8">
                                {/*signin form */}
                                <FooterComponent />
                                {/***/}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
/*other supporting functions*/
export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['auth', 'common'])),
        },
    };
}
/***/
const PageWithRouter = withRouter(Page);
const pageWithTranslation = withTranslation(['auth', 'common'])(PageWithRouter)
pageWithTranslation.getLayout = function getLayout(page) {
    return (<Layout>{page}</Layout>);
};
export default pageWithTranslation;