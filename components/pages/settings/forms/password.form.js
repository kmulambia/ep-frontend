/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment } from 'react';
import { withRouter } from 'next/router'
import { withTranslation } from 'next-i18next';
import { Formik, Form, Field, ErrorMessage } from "formik"
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
//STORES , COMPONETS AND FROMS 
//INITIALISE
import { ChangePasswordSchema } from "../../../../services/schema/user.schema"
//

class FormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            showPassword: false,
        };
    }
    componentDidMount() {
    }
    //Functions
    handleOpen = () => {
        this.setState({ open: true })
    };

    handleClose = () => {
        this.setState({ open: false })
    };

    handleOkay = (data) => {
        this.props.onOkay(data);
        this.setState({ open: false })
    };
    //Render
    render() {
        return (
            <>
                <div>
                    <button
                        type="button"
                        onClick={() => this.setState({ open: true })}
                        className="capitalize ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                        {this.props.t('index_page.components.password.update_password', { ns: 'settings' })}
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
                                                        {this.props.t('index_page.components.password.update_password', { ns: 'settings' })}
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
                                                        password: "",
                                                        confirmPassword: "",
                                                    }}
                                                    validationSchema={ChangePasswordSchema(this.props.t)}
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
                                                        return (
                                                            <Form>
                                                                <div className="sm:col-span-2">
                                                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 capitalize">
                                                                        {this.props.t('models.user.password', { ns: 'common' })}
                                                                    </label>
                                                                    <div className="mt-1">
                                                                        <Field
                                                                            id="password"
                                                                            name="password"
                                                                            type={this.state.showPassword ? 'text' : 'password'}
                                                                            autoComplete="password"
                                                                            required
                                                                            className={`py-3 px-4 block w-full shadow-sm border-gray-300 rounded-md
                                                                                    ${touched.password &&
                                                                                    errors.password
                                                                                    ? "is-invalid  focus:ring-red-500 focus:border-red-500 "
                                                                                    : "focus:ring-primary-500 focus:border-primary-500"
                                                                                }`}
                                                                        />
                                                                        <ErrorMessage
                                                                            component="span"
                                                                            name="password"
                                                                            className="invalid-feedback"
                                                                        />


                                                                    </div>
                                                                    <div className="flex items-center mt-1">
                                                                        <input
                                                                            id="show-password"
                                                                            onChange={() => this.setState({ showPassword: !this.state.showPassword })}
                                                                            name="show-password"
                                                                            type="checkbox"
                                                                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                                                        />
                                                                        <label htmlFor="show-password" className="ml-2 pt-1 block text-sm text-gray-900">
                                                                            {this.props.t('forms.show_password', { ns: 'common' })}
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div className="mt-2">
                                                                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 capitalize">
                                                                        {this.props.t('models.user.confirm_password', { ns: 'common' })}
                                                                    </label>
                                                                    <div className="mt-1">

                                                                        <Field
                                                                            id="confirmPassword"
                                                                            name="confirmPassword"
                                                                            type="password"
                                                                            required
                                                                            className={`py-3 px-4 block w-full shadow-sm border-gray-300 rounded-md
                                                                                            ${touched.confirmPassword &&
                                                                                    errors.confirmPassword
                                                                                    ? "is-invalid  focus:ring-red-500 focus:border-red-500 "
                                                                                    : "focus:ring-primary-500 focus:border-primary-500"
                                                                                }`}
                                                                        />
                                                                        <ErrorMessage
                                                                            component="span"
                                                                            name="confirmPassword"
                                                                            className="invalid-feedback"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                                                    <button
                                                                        type="submit"
                                                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm capitalize"
                                                                       
                                                                    >

                                                                        {this.props.t('forms.update', { ns: 'common' })}
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm capitalize"
                                                                        onClick={this.handleClose}
                                                                    >
                                                                        {this.props.t('forms.cancel', { ns: 'common' })}
                                                                    </button>
                                                                </div>

                                                            </Form>);
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
            </>
        );
    }
}

const FormComponentWithRouter = withRouter(FormComponent);

const FormComponentWithTranslation = withTranslation(['settings', 'common'])(FormComponentWithRouter)

export default FormComponentWithTranslation;
