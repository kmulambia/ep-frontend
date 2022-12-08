import React from "react";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { withRouter } from 'next/router'
import { Menu, Popover, Transition } from "@headlessui/react";
import {
  CogIcon,
  UserCircleIcon,
  UserGroupIcon,
  UsersIcon,
  TagIcon,
  InboxArrowDownIcon,
  PresentationChartLineIcon,
  HomeIcon,
  Bars3Icon,
  BellIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { withTranslation } from 'next-i18next';
import moment from 'moment';
import { classNames, componentKey } from "../../services/helpers.service"
import Swal from 'sweetalert2/dist/sweetalert2.js';
//STORES , COMPONETS AND FROMS 
import useUserStore from "../../services/store/user.store";
//INITIALISE
const userStore = new useUserStore();
//PAGE
class LayoutComponet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      user: { username: " ", email: " " },
      role: " ",
      userNavigation: [
        // { name: this.props.t('pages.settings', { ns: 'common' }), href: "#2" },
        { name: this.props.t('pages.about', { ns: 'common' }), href: "#2" },
      ],
      other: [
        { name: this.props.t('pages.help', { ns: 'common' }), href: "#1" },
        { name: this.props.t('pages.about', { ns: 'common' }), href: "#2" },
      ],
    };
  }
  componentDidMount() {
    this.setState({
      user: userStore.getUser() != null ? userStore.getUser() : { username: " ", email: " " },
      role: userStore.getRole() != null ? userStore.getRole() : " "
    });
  }

  changeLanguage = (value) => {
    // this.props.t.locale = value
    // console.log(this.props.router)
    // if (this.props.router.locale != value){
    //   this.props.router.push({
    //     route: this.props.router.pathname,
    //     query: this.props.router.query
    // }, this.props.router.asPath, { value });
    //   this.setState({ language: value })
    //   i18n.changeLanguage(value)
    // }
  }
  navigation() {
    let navList = [
      { name: this.props.t('pages.home', { ns: 'common' }), href: "/admin", icon: HomeIcon, current: false },
      {
        name: this.props.t('pages.users', { ns: 'common' }),
        href: "/admin/users",
        icon: UsersIcon,
        current: false,
      },
      // {
      //   name: this.props.t('pages.members', { ns: 'common' }),
      //   href: "/admin/members",
      //   icon: UserGroupIcon,
      //   current: false,
      // },
      // {
      //   name: this.props.t('pages.programs', { ns: 'common' }),
      //   href: "/admin/programs",
      //   icon: TagIcon,
      //   current: false,
      // },
      // {
      //   name: this.props.t('pages.reports', { ns: 'common' }),
      //   href: "/admin/reports",
      //   icon:
      //     PresentationChartLineIcon,
      //   current: false,
      // },
      // {
      //   name: this.props.t('pages.imports', { ns: 'common' }),
      //   href: "/admin/import",
      //   icon: InboxArrowDownIcon,
      //   current: false,
      // },
      {
        name: this.props.t('pages.settings', { ns: 'common' }),
        href: "/admin/settings",
        icon: CogIcon,
        current: false,
      },
    ];
    for (let nav of navList)
      if (
        nav.href.split("/")[1] + nav.href.split("/")[2] ==
        this.props.router.asPath.split("/")[1] + this.props.router.asPath.split("/")[2]
      )
        nav.current = true;
    return navList;
  }

  onSignout = () => {
    Swal.fire({
      titleText: this.props.t('notification.warning', { ns: 'common' }),
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      html: this.props.t('notification.signout.confirmation', { ns: 'common' }),
      cancelButtonText: this.props.t('forms.dismiss', { ns: 'common' }) ,
      confirmButtonText: this.props.t('forms.continue', { ns: 'common' }) ,
      buttonsStyling: false,
      allowOutsideClick: false,
      customClass: {
        actions:'my-actions',
          icon: '',
          title: 'text-red-400',
          container: 'text-xs text-red-200',
          actions: 'flex space-x-3',
          confirmButton: 'order-2 inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-10 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm ',
          cancelButton: 'order-1 inline-flex justify-center rounded-md border border-gray-300 bg-white px-10 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm'
      }
  }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          position: 'top-end',
          toast: true,
          titleText: this.props.t('status.success', { ns: 'common' }),
          showCancelButton: true,
          showConfirmButton: false,
          color: '#31774b',
          icon: 'success',
          width: 450,
          html: this.props.t('notification.signout.success', { ns: 'common' }),
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
        userStore.signout();
        this.props.router.push("/signin");
      } 
  })
    
    //clear
    //this.setState({ user: {}, role: {} })
    //Redirect user dashboard
    
    // this.setState({ open: true })
  }

  signout = () => {
    userStore.signout();
    //clear
    //this.setState({ user: {}, role: {} })
    //Redirect user dashboard
    this.props.router.push("/signin");
  }
  render() {
    return (
      <React.Fragment>
        <div className="min-h-full bg-slate-100 " style={{ height: '100vh' }}>
          {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
          <Popover
            as="header"
            className={({ open }) =>
              classNames(
                open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
                'bg-white shadow-sm lg:static lg:overflow-y-visible'
              )
            }
          >
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
                  <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12 py-3">
                    <div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
                      <div className="flex flex-shrink-0 items-center">
                        <a href="#">
                          <Image
                            className="block "
                            src="/logo.png"
                            width={40}
                            height={40}
                            alt={process.env.NEXT_PUBLIC_NAME}
                          />
                        </a>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                      <div className="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
                        <div className="w-full">

                        </div>
                      </div>
                    </div>
                    <div className="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
                      {/* Mobile menu button */}
                      <Popover.Button className="-mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
                        <span className="sr-only">Open menu</span>
                        {open ? (
                          <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                        )}
                      </Popover.Button>
                    </div>
                    <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">

                      <a
                        href="#"
                        className="ml-5 flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </a>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-5 flex-shrink-0">
                        <div>
                          <Menu.Button className="flex rounded-full bg-white focus:outline-none ">
                            <span className="sr-only">Open user menu</span>
                            <div className="text-right">
                              <div className="text-base text-sm font-medium text-gray-700 lowercase">{this.state.user.username} {"(" + this.state.role + ")"}</div>
                              <div className="text-xs font-medium text-gray-500 lowercase">{this.state.user.email}</div>
                            </div>
                            < Bars3Icon className="ml-2 mt-2 h-7 w-7 rounded-full text-gray-400 " aria-hidden="true" />

                          </Menu.Button>

                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {this.state.userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block py-2 px-4 text-sm text-gray-700', 'capitalize'
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  style={{ cursor: "pointer" }}
                                  href={null}
                                  onClick={() =>
                                    this.onSignout()
                                  }
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 capitalize')}
                                >
                                  {this.props.t('pages.signout', { ns: 'common' })}
                                </a>

                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                      <div className="ml-5">
                        {/*language options**/}
                      </div>


                    </div>
                  </div>
                </div>

                <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
                  <div className="mx-auto max-w-3xl space-y-1 px-2 pt-2 pb-3 sm:px-4">
                    {this.navigation().map((item) => (
                      <Link key={item.name} href={item.href} >
                        <a
                          aria-current={item.current ? 'page' : undefined}
                          className={classNames(
                            item.current ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50',
                            'block rounded-md py-2 px-3 text-base font-medium', "capitalize"
                          )}
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="mx-auto flex max-w-3xl items-center px-4 sm:px-6">
                      <div className="flex-shrink-0">
                        <UserCircleIcon className="h-8 w-8 rounded-full text-gray-400 " aria-hidden="true" />

                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium text-gray-800">{this.state.user.username} {"(" + this.state.role + ")"}</div>
                        <div className="text-sm font-medium text-gray-500">{this.state.user.email}</div>
                      </div>
                      <button
                        type="button"
                        className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4">
                      {this.state.userNavigation.map((item) => (
                        <a
                          style={{ cursor: "pointer" }}
                          key={item.name}

                          className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 capitalize"
                        >
                          {item.name}
                        </a>
                      ))}
                      <a
                        style={{ cursor: "pointer" }}
                        href={null}
                        onClick={() =>
                          this.onSignout()
                        }
                        className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 capitalize"
                      >
                        {this.props.t('pages.signout', { ns: 'common' })}
                      </a>
                    </div>
                  </div>

                  <div className="mx-auto mt-6 max-w-3xl px-4 sm:px-6">
                    {/*language options*/}

                  </div>
                </Popover.Panel>
              </>
            )}
          </Popover>

          <div className="py-5">
            <div className="mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
              <div className="hidden lg:col-span-2 lg:block xl:col-span-2">
                <nav aria-label="Sidebar" className="sticky top-4 divide-y divide-gray-300">
                  <div className="space-y-1 pb-8">
                    {this.navigation().map((item) => (
                      <Link key={item.name} href={item.href} replace>
                        <a
                          aria-current={item.current ? "page" : undefined}
                          className={classNames(
                            item.current ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-50',
                            'group flex items-center px-3 py-2 text-sm font-medium rounded-md'
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                              'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                            )}
                            aria-hidden="true"
                          />
                          <span className="truncate capitalize">{item.name}</span>
                        </a>
                      </Link>
                    ))}
                  </div>
                  <div>
                    <div className="text-center pt-3 text-xs  text-gray-500">
                      <p>&copy; {moment().format('YYYY')}  {process.env.NEXT_PUBLIC_NAME} v-{process.env.NEXT_PUBLIC_VERSION}</p>
                      <p>{this.props.t('signature.dad', { ns: 'common' })} by  &nbsp;
                        <Link href={process.env.NEXT_PUBLIC_DEVELOPER_URL} target="_blank" rel='noopener noreferrer' >
                          <a className="font-medium text-primary-600 hover:text-primary-500 capitalize">
                            {process.env.NEXT_PUBLIC_DEVELOPER}
                          </a>
                        </Link>
                      </p>
                    </div>
                    <div className="text-center text-xs px-4 py-5  text-gray-500">
                      <Link href="/help" target="_blank" rel='noopener noreferrer' >
                        <a className="font-medium text-xs text-gray-500 hover:text-gray-500 capitalize">
                          {this.props.t('pages.help', { ns: 'common' })}
                        </a>
                      </Link>
                      &nbsp;
                      -
                      &nbsp;
                      <Link href="/privacy" target="_blank" rel='noopener noreferrer' >
                        <a className="font-medium text-xs text-gray-500 hover:text-gray-500 capitalize">
                          {this.props.t('pages.privacy', { ns: 'common' })}
                        </a>
                      </Link>
                      &nbsp;
                      -
                      &nbsp;
                      <Link href="/terms" target="_blank" rel='noopener noreferrer' >
                        <a className="font-medium text-xs text-gray-500 hover:text-gray-500 capitalize">
                          {this.props.t('pages.terms', { ns: 'common' })}
                        </a>
                      </Link>
                    </div>
                  </div>
                </nav>
              </div>
              <main className=" sm:col-span-10">
                {this.props.children}
              </main>
            </div>
          </div>
        </div >
      </React.Fragment>
    )
  }
}
/*other supporting functions*/
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['auth', 'common'])),
      // Will be passed to the page component as props
    },
  };
}
/***/
const LayoutComponetWithRouter = withRouter(LayoutComponet);
const LayoutComponetWithTranslation = withTranslation(['auth', 'common'])(LayoutComponetWithRouter)

export default LayoutComponetWithTranslation;
