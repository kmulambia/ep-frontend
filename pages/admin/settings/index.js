import React from "react";
import { withRouter } from "next/router";
import { withTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from "../../../components/layouts/admin.layout";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AdjustmentsVerticalIcon, LockClosedIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline'
import { Tab } from '@headlessui/react'
//STORES , COMPONETS AND FROMS 
import BreadcrumbWidget from "../../../components/widgets/breadcrumbs/admin.widget";
import LoadingWidget from "../../../components/widgets/loading.widget"
import GeneralComponent from "../../../components/pages/settings/general.component"
import SecurityComponent from "../../../components/pages/settings/security.component"
import LogComponent from "../../../components/pages/settings/log.component"
import { classNames, componentKey } from "../../../services/helpers.service"
import useUserStore from "../../../services/store/user.store";
import useLogStore from "../../../services/store/log.store";
import useRoleStore from "../../../services/store/role.store";
//INITIALISE
const userStore = new useUserStore();
const logStore = new useLogStore();
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
          name: this.props.t('pages.settings', { ns: 'common' })
        },
      ],
      tabs:
        [
          { name: this.props.t('index_page.tabs.general', { ns: 'settings' }), icon: AdjustmentsVerticalIcon },
          { name: this.props.t('index_page.tabs.security', { ns: 'settings' }), icon: LockClosedIcon },
          { name: this.props.t('index_page.tabs.logs', { ns: 'settings' }), icon: ClipboardDocumentIcon },
        ]
      ,
      id: "",
      logs: [],
      roles: [],
      //VARIABLES
      model: {
        name: "",
        phone: "",
        email: "",
        password: "",
        status: true,
        roleId: "",
      },
    };
  }
  componentDidMount() {
    var user = userStore.getUser();
    this.setState({ id: user.id })
    this.getUser(user.id);
    this.getLogs(user.id);
    this.getRoles();

  }
  getUser = (id) => {
    this.setState({ loading: true });
    userStore
      .get(id)
      .then((response) => {
        this.setState({ model: response });
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
  updateUser = (data) => {
    this.setState({ loading: true });
    userStore
      .update(data)
      .then((result) => {

        Swal.fire({
          position: 'top-end',
          toast: true,
          titleText: this.props.t('status.success', { ns: 'common' }),
          showCancelButton: true,
          showConfirmButton: false,
          color: '#31774b',
          icon: 'success',
          width: 450,
          html:  this.props.t('index_page.components.profile.notification.success', { ns: 'settings' }),
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

      
        this.signOut();
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
          html:  this.props.t('index_page.components.profile.notification.failed', { ns: 'settings' }) +
          "(" + error.messsage + ")",
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

      }).finally(() => {
        this.setState({ loading: false });
      });
  };

  changePassword = (data) => {
    this.setState({ loading: true });
    userStore
      .changePassword(data)
      .then((result) => {

        Swal.fire({
          position: 'top-end',
          toast: true,
          titleText: this.props.t('status.success', { ns: 'common' }),
          showCancelButton: true,
          showConfirmButton: false,
          color: '#31774b',
          icon: 'success',
          width: 450,
          html:  this.props.t('index_page.components.password.notification.success', { ns: 'settings' }),
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
       
        this.signOut();
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
          html:   this.props.t('index_page.components.password.notification.failed', { ns: 'settings' }) +
          "(" + error.messsage + ")",
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

     
      }).finally(() => {
        this.setState({ loading: false });
      });
  };
  /**Roles**/
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
  /**logs**/
  getLogs = (id) => {
    this.setState({ loading: true });
    logStore
      .getByEntityId(id)
      .then((response) => {
        this.setState({ logs: response });
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
          html: this.props.t('notification.fetch_data_failed', { ns: 'common' }) + "(" + this.props.t('pages.logs', { ns: 'common' }) + ")",
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
  signOut = () => {
    userStore.signout();
    setInterval(() => {
      this.props.router.push("/signin");
    }, 2000);
  }
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
              <h1 className="text-3xl font-extrabold text-gray-900 capitalize">{this.props.t('index_page.title', { ns: 'settings' })}</h1>
            </div>
            <div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
            </div>
          </div>
          <div className="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg bg-white sm:p-5">
            <Tab.Group >
              <div className="border-b border-gray-200 bg-white">
                <Tab.List >
                  <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {this.state.tabs.map((tab) => (
                      <Tab
                        key={tab.name}
                        className={({ selected }) => classNames(
                          selected ? 'border-primary-500 text-primary-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                          'group inline-flex items-center py-4 px-1 border-b-2 focus:outline-none'
                        )}
                      >
                        <tab.icon
                          className="-ml-0.5 mr-2 block h-5 w-5"
                          aria-hidden="true"
                        />
                        <span className="capitalize  font-medium text-sm">{tab.name}</span>

                      </Tab>
                    ))}
                  </nav>
                </Tab.List>
              </div>
              <Tab.Panels className="py-5">
                <Tab.Panel>
                  <GeneralComponent
                    key={componentKey(this.state.model.id)}
                    model={this.state.model}
                    update={this.updateUser} />
                </Tab.Panel>
                <Tab.Panel>
                  <SecurityComponent
                    key={componentKey(this.state.model.id)}
                    model={this.state.model}
                    roles={this.state.roles}
                    changePassword={this.changePassword}
                    update={this.updateUser} />
                </Tab.Panel>
                <Tab.Panel>
                  <LogComponent
                    key={componentKey(this.state.model.id)}
                    model={this.state.model}
                    data={this.state.logs} />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
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
      ...(await serverSideTranslations(locale, ['settings', 'common'])),
      // Will be passed to the page component as props
    },
  };
}
/***/
const PageWithRouter = withRouter(Page);
const PageWithTranslation = withTranslation(['settings', 'common'])(PageWithRouter)
PageWithTranslation.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default PageWithTranslation;