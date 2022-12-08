import React from "react";
import Image from "next/image";
import Link from "next/link";
import { withRouter } from 'next/router'
import Layout from "../components/layouts/default.layout";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { withTranslation } from 'next-i18next';
//STORES , COMPONETS AND FROMS 
import useUserStore from "../services/store/user.store";
import SigninForm from "../components/pages/auth/forms/signin.form";
import FooterComponent from "../components/pages/auth/footer.component";
import LoadingWidget from "../components/widgets/loading.widget"
import Swal from 'sweetalert2/dist/sweetalert2.js';

//INITIALISE
const userStore = new useUserStore();
//PAGE
class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            agreed: false,
            showPassword: false,

        };
    }
    signIn = (data) => {
        this.setState({ loading: true });
        userStore
            .signin(data)
            .then((result) => {
                if (result) {
                    //reloads page and directs user to their page
                    setInterval(() => {
                        this.props.router.reload();
                    }, 2000);

                    Swal.fire({
                        position: 'top-end',
                        toast: true,
                        titleText: this.props.t('status.success', { ns: 'common' }),
                        showCancelButton: true,
                        showConfirmButton: false,
                        color: '#31774b',
                        icon: 'success',
                        width: 450,
                        html: this.props.t('signin_page.notification.success', { ns: 'auth' }),
                        cancelButtonText: this.props.t('forms.dismiss', { ns: 'common' }),
                        confirmButtonText: this.props.t('forms.okay', { ns: 'common' }),
                        buttonsStyling: false,
                        customClass: {
                            container: 'text-xs text-success-200',
                            actions: 'space-x-2',
                            confirmButton: 'capitalize inline-flex items-center font-semibold bg-white px-3 py-2 text-sm font-medium leading-4 text-success-700  rounded-sm focus:outline-none hover:bg-success-100 focus:ring-2 focus:ring-success-500 focus:ring-offset-2',
                            cancelButton: 'capitalize inline-flex items-center font-semibold bg-white px-3 py-2 text-sm font-medium leading-4 text-success-700  rounded-sm focus:outline-none hover:bg-success-100 focus:ring-2 focus:ring-success-500 focus:ring-offset-2'
                        }
                    })

                } else {

                    Swal.fire({
                        position: 'top-end',
                        toast: true,
                        titleText: this.props.t('status.failed', { ns: 'common' }),
                        showCancelButton: true,
                        showConfirmButton: false,
                        color: '#ad4545',
                        icon: 'error',
                        width: 450,
                        html: this.props.t('signin_page.notification.failed_bad_network', { ns: 'auth' }),
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
                            html: this.props.t('signin_page.notification.failed_invalid_credentials', { ns: 'auth' }),
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
                            html: "("+error.message +")" ,
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

    };

    componentDidMount() {

     

    }

    render() {
        return (
            <>
                <LoadingWidget loading={this.state.loading} />
                <div className="min-h-full flex">
                    <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                        <div className="mx-auto w-full max-w-sm lg:w-100">
                            <div className="">
                                <Image
                                    className=""
                                    src="/logo.png"
                                    width={100}
                                    height={100}
                                    alt={process.env.NEXT_PUBLIC_NAME}
                                />
                                <h2 className="text-3xl font-extrabold text-gray-900"> {this.props.t('signin_page.title', { ns: 'auth' })}</h2>
                                <p className="text-sm text-gray-600">
                                    <span className="capitalize"> {this.props.t('signin_page.or', { ns: 'auth' })}{' '} </span>
                                    <Link href="/signup">
                                        <a className="font-medium text-primary-600 hover:text-primary-500 ">
                                            {this.props.t('signin_page.create_account', { ns: 'auth' })} &rarr;
                                        </a>
                                    </Link>
                                </p>
                            </div>
                            <div className="pt-1" >
                                {/*signin form */}
                                <SigninForm signIn={this.signIn} />
                                {/***/}
                            </div>
                            <div >
                                {/*signin form */}
                                <FooterComponent />
                                {/***/}
                            </div>
                        </div>
                    </div>
                    <div className="hidden lg:block relative w-0 flex-1 bg-blend-darken">
                        <Image
                            className="absolute inset-0 h-full w-full object-cover "
                            src="/backgrounds/bg-1.webp"
                            layout='fill'
                            alt="Umozi Source Background"
                        />
                    </div>
                </div>
            </>
        )
    };
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