import React from "react";
import { withRouter } from "next/router";
import { withTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from "../../../components/layouts/admin.layout";
import Swal from 'sweetalert2/dist/sweetalert2.js';
//STORES , COMPONETS AND FROMS 
import BreadcrumbWidget from "../../../components/widgets/breadcrumbs/admin.widget";
import LoadingWidget from "../../../components/widgets/loading.widget"
import useUserStore from "../../../services/store/user.store";
import useRoleStore from "../../../services/store/role.store";
import CreateUserForm from "../../../components/pages/users/forms/create.form"
import ViewUsersComponent from "../../../components/pages/users/view.component"
import { componentKey } from "../../../services/helpers.service"
//INITIALISE
const userStore = new useUserStore();
const roleStore = new useRoleStore();
//PAGE
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      breadcrumbPages: [
        {
          href: "/admin",
          name: this.props.t('navigation.home', { ns: 'common' })
        },
        {
          href: "#",
          name: this.props.t('pages.users', { ns: 'common' })
        },
      ],
      data: [],
      roles: [],
    };

  }
  componentDidMount() {
    this.getUsers();
    this.getRoles();
  }
  /**Users**/
  getUsers = () => {
    this.setState({ loading: true });
    userStore
      .get()
      .then((response) => {
        if (typeof response != "undefined") {
          this.setState({ data: response });
        }
      })
      .catch((error) => {
        Swal.fire({
          position: 'top-end',
          toast: true,
          titleText: this.props.t('status.failed', { ns: 'common' }),
          showCancelButton: true,
          showConfirmButton: false,
          color: '#ad4545',
          icon: 'error',
          width: 450,
          html: this.props.t('notification.fetch_data_failed', { ns: 'common' }) + "(" + this.props.t('pages.users', { ns: 'common' }) + ")",
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
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };
  createUser = (data) => {
    this.setState({ loading: true });
    userStore
      .create(data)
      .then((response) => {
        Swal.fire({
          position: 'top-end',
          toast: true,
          titleText: this.props.t('status.success', { ns: 'common' }),
          showCancelButton: true,
          showConfirmButton: false,
          color: '#31774b',
          icon: 'success',
          width: 450,
          html: this.props.t('index_page.notification.success', { ns: 'users' }),
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
              html: this.props.t('index_page.notification.failed', { ns: 'users' }) + "(" + error.message + ")",
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
              html: this.props.t('index_page.notification.failed_duplicate_email', { ns: 'users' }),
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
              html: error.message,
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
        this.getUsers();
        this.setState({ loading: false });
      });
  };
  /**Roles*/
  getRoles = () => {
    this.setState({ loading: true });
    roleStore
      .get()
      .then((response) => {
        if (typeof response != "undefined") {
          this.setState({ roles: response });
        }
      })
      .catch((error) => {
        Swal.fire({
          position: 'top-end',
          toast: true,
          titleText: this.props.t('status.failed', { ns: 'common' }),
          showCancelButton: true,
          showConfirmButton: false,
          color: '#ad4545',
          icon: 'error',
          width: 450,
          html: this.props.t('notification.fetch_data_failed', { ns: 'common' }) + "(" + this.props.t('pages.roles', { ns: 'common' }) + ")",
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
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <>
        <LoadingWidget loading={this.state.loading} />
        <div className="max-w-2xl mx-auto px-2 sm:px-6 lg:max-w-5xl lg:px-2">
          <div>
            <BreadcrumbWidget breadcrumbs={this.state.breadcrumbPages} />
          </div>
          <div className=" py-2  md:flex md:items-center md:justify-between">
            <div className="px-4 sm:px-6 md:px-0">
              <h1 className="text-3xl font-extrabold text-gray-900 capitalize">{this.props.t('index_page.title', { ns: 'users' })}</h1>
            </div>
            <div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
              <CreateUserForm
                roles={this.state.roles}
                create={this.createUser}
                key={componentKey("create-users")} />
            </div>
          </div>
          <div className="align-middle inline-block min-w-full min-h-full mt-5" style={{ height: '60vh', minHeight: '200px', width: '100%' }}>
            <div className="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg bg-white sm:p-5" style={{ display: 'flex', height: '100%' }} >
              <ViewUsersComponent
                data={this.state.data}
                key={componentKey("view-users")} />
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
      ...(await serverSideTranslations(locale, ['users', 'common'])),
      // Will be passed to the page component as props
    },
  };
}
/***/
const PageWithRouter = withRouter(Page);
const PageWithTranslation = withTranslation(['users', 'common'])(PageWithRouter)
PageWithTranslation.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default PageWithTranslation;