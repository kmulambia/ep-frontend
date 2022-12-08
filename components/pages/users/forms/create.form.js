/* This example requires Tailwind CSS v2.0+ */
import React from 'react';
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { withRouter } from 'next/router'
import { withTranslation } from 'next-i18next';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { XMarkIcon } from '@heroicons/react/24/outline'
//STORES , COMPONETS AND FROMS 
import { UserRegistrationSchema } from "../../../../services/schema/user.schema";
//INITIALISE
class FormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }
    componentDidMount() {
    }

    handleOpen = () => {
        this.setState({ open: true })
    };

    handleClose = () => {
        this.setState({ open: false })
    };

    handleOkay = (data) => {
        this.props.create(data);
        this.setState({ open: false })
    };
    //Render
    render() {
        return (
            <React.Fragment>
                <div>
                    <button
                        type="button"
                        onClick={this.handleOpen}
                        className="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 capitalize"
                    >
                        {this.props.t('forms.register', { ns: 'common' })}
                    </button>
                    <Transition.Root show={this.state.open} as={Fragment}>
                        <Dialog as="div" className="relative z-10" onClose={() => { }}>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                            </Transition.Child>

                            <div className="fixed inset-0 z-10 overflow-y-auto">
                                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    >
                                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">

                                            <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                                                <button
                                                    type="button"
                                                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                                                    onClick={this.handleClose}
                                                >
                                                    <span className="sr-only">Close</span>
                                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                            <div className="sm:flex sm:items-start">
                                                {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                                    <ShieldCheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                                </div> */}
                                                <div className="mt-3 text-center sm:mt-0  sm:text-left">
                                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 capitalize">
                                                        {this.props.t('index_page.register_user', { ns: 'users' })}
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-gray-500">
                                                            {/* help text  */}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div >
                                                <Formik
                                                    initialValues={{
                                                        username: "Info user",
                                                        phone: "0998889576",
                                                        email: "info@umodzisource.com",
                                                        password: "admin429",
                                                        confirmPassword: "admin429",
                                                        status: false,
                                                        roleId: "ADMIN1"
                                                    }}
                                                    validationSchema={UserRegistrationSchema(this.props.t)}
                                                    onSubmit={(formData, { resetForm }) => {
                                                        var data = Object.assign({}, formData)
                                                        //
                                                        delete data.confirmPassword;
                                                        //
                                                        this.handleOkay(data)
                                                        resetForm({ values: '' });
                                                        this.setState({ open: false })
                                                    }}
                                                >
                                                    {({ touched, errors, isSubmitting, values }) => {
                                                        return <>
                                                            <Form>
                                                                <div className='space-y-4 '  >
                                                                    <div>
                                                                        <div >
                                                                            <label
                                                                                className="block text-sm font-medium text-gray-700 capitalize" htmlFor="username">  {this.props.t('models.user.username', { ns: 'common' })}</label>
                                                                            <Field

                                                                                type="text"
                                                                                name="username"
                                                                                className={`mt-2  
                                                                       block
                                                                        w-full
                                                                        shadow-sm
                                                                        sm:text-sm
                                                                        border-gray-300
                                                                        rounded-md
                                                                        ${touched.username && errors.username ? "is-invalid  focus:ring-red-500 focus:border-red-500 " : "focus:ring-primary-500 focus:border-primary-500"}`} />
                                                                            <ErrorMessage
                                                                                component="span"
                                                                                name="username"
                                                                                className="invalid-feedback" />
                                                                        </div>
                                                                        <div className="grid grid-cols-6 gap-2">
                                                                            <div className="col-span-6 sm:col-span-3">
                                                                                <label
                                                                                    className="block text-sm font-medium text-gray-700 capitalize" htmlFor="email">  {this.props.t('models.user.email', { ns: 'common' })}</label>
                                                                                <Field
                                                                                    type="email"
                                                                                    name="email"
                                                                                    className={`mt-2  
                                                                        block
                                                                        w-full
                                                                        shadow-sm
                                                                        sm:text-sm
                                                                        border-gray-300
                                                                        rounded-md
                                                                        ${touched.email && errors.email ? "is-invalid  focus:ring-red-500 focus:border-red-500 " : "focus:ring-primary-500 focus:border-primary-500"}`} />
                                                                                <ErrorMessage
                                                                                    component="span"
                                                                                    name="email"
                                                                                    className="invalid-feedback" />
                                                                            </div>
                                                                            <div className="col-span-6 sm:col-span-3">
                                                                                <label
                                                                                    className="block text-sm font-medium text-gray-700 capitalize" htmlFor="email">{this.props.t('models.user.phone', { ns: 'common' })}</label>
                                                                                <Field
                                                                                    type="text"
                                                                                    name="phone"
                                                                                    className={`mt-2  
                                                                        block
                                                                        w-full
                                                                        shadow-sm
                                                                        sm:text-sm
                                                                        border-gray-300
                                                                        rounded-md
                                                                        ${touched.phone && errors.phone ? "is-invalid  focus:ring-red-500 focus:border-red-500 " : "focus:ring-primary-500 focus:border-primary-500"}`} />
                                                                                <ErrorMessage
                                                                                    component="span"
                                                                                    name="email"
                                                                                    className="invalid-feedback" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="grid grid-cols-6 gap-2 pt-1">
                                                                            <div className="col-span-6 sm:col-span-2">
                                                                                <label
                                                                                    className="block text-sm font-medium text-gray-700 capitalize" htmlFor="email">{this.props.t('models.user.role', { ns: 'common' })}</label>
                                                                                <Field as="select" name="roleId" className={`mt-2  
                                                                        block
                                                                        shadow-sm
                                                                        w-full
                                                                        sm:text-sm
                                                                        border-gray-300
                                                                        rounded-md
                                                                        ${touched.roleId && errors.roleId ? "is-invalid  focus:ring-red-500 focus:border-red-500 " : "focus:ring-primary-500 focus:border-primary-500"}`}>
                                                                                    {this.props.roles.map((item, i) => {
                                                                                        return <option value={item.id} key={i}>{item.name}</option>;
                                                                                    })}


                                                                                </Field>
                                                                                <ErrorMessage
                                                                                    component="span"
                                                                                    name="roleId"
                                                                                    className="invalid-feedback" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="grid grid-cols-6 gap-2 pt-1">
                                                                            <div className="col-span-6 sm:col-span-3">
                                                                                <label
                                                                                    className="block text-sm font-medium text-gray-700 capitalize" htmlFor="password">{this.props.t('models.user.password', { ns: 'common' })}</label>
                                                                                <Field

                                                                                    type="password"
                                                                                    name="password"
                                                                                    className={`mt-2  
                                                                        block
                                                                        shadow-sm
                                                                        w-full
                                                                        sm:text-sm
                                                                        border-gray-300
                                                                        rounded-md
                                                                        ${touched.password && errors.password ? "is-invalid  focus:ring-red-500 focus:border-red-500 " : "focus:ring-primary-500 focus:border-primary-500"}`} />
                                                                                <ErrorMessage
                                                                                    component="span"
                                                                                    name="password"
                                                                                    className="invalid-feedback" />
                                                                            </div>
                                                                            <div className="col-span-6 sm:col-span-3">
                                                                                <label
                                                                                    className="block text-sm font-medium text-gray-700 capitalize" htmlFor="confirmPassword">{this.props.t('models.user.confirm_password', { ns: 'common' })}</label>
                                                                                <Field

                                                                                    type="password"
                                                                                    name="confirmPassword"
                                                                                    className={`mt-2  
                                                                        block
                                                                        shadow-sm
                                                                        w-full
                                                                        sm:text-sm
                                                                        border-gray-300
                                                                        rounded-md
                                                                        ${touched.confirmPassword && errors.confirmPassword ? "is-invalid  focus:ring-red-500 focus:border-red-500 " : "focus:ring-primary-500 focus:border-primary-500"}`} />
                                                                                <ErrorMessage
                                                                                    component="span"
                                                                                    name="confirmPassword"
                                                                                    className="invalid-feedback" />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                                                    <button
                                                                        type="submit"
                                                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm capitalize"

                                                                    >

                                                                        {this.props.t('forms.submit', { ns: 'common' })}
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm capitalize"
                                                                        onClick={this.handleClose}
                                                                    >
                                                                        {this.props.t('forms.cancel', { ns: 'common' })}
                                                                    </button>
                                                                </div>
                                                            </Form>
                                                        </>;
                                                    }
                                                    }
                                                </Formik>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition.Root>
                </div>
            </React.Fragment>
        );
    }
}

const FormComponentWithRouter = withRouter(FormComponent);

const FormComponentWithTranslation = withTranslation(['users', 'common'])(FormComponentWithRouter)

export default FormComponentWithTranslation;
