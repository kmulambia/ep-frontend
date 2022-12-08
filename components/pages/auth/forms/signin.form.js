/* This example requires Tailwind CSS v2.0+ */
import React from "react";
import { Fragment, useRef, useState } from "react";
import Link from "next/link";
import { withRouter } from 'next/router'
import { SignInSchema } from "../../../../services/schema/auth.schema";
import { withTranslation } from 'next-i18next';
import { Formik, Form, Field, ErrorMessage } from "formik";

class FormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            showPassword: false,
        };
    }
    render() {
        return (
            <>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validationSchema={SignInSchema(this.props.t)}
                    onSubmit={(data, { resetForm }) => {
                        this.props.signIn(data);
                        resetForm();
                    }}
                >
                    {({ touched, errors, isSubmitting, values }) => (
                        <div className="">
                            <Form className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 capitalize">
                                        {this.props.t('models.user.email', { ns: 'common' })}
                                    </label>
                                    <div className="mt-1">
                                        <Field
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm
                                            ${touched.email &&
                                                    errors.email
                                                    ? "is-invalid  focus:ring-red-500 focus:border-red-500 "
                                                    : "focus:ring-primary-500 focus:border-primary-500"
                                                }`}
                                        />
                                        <ErrorMessage
                                            component="span"
                                            name="email"
                                            className="invalid-feedback"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
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
                                            className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm
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
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center ">
                                        <input
                                            id="show-password"
                                            onChange={() => this.setState({ showPassword: !this.state.showPassword })}
                                            name="show-password"
                                            type="checkbox"
                                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="show-password" className="ml-2 block text-sm text-gray-900 ">
                                            {this.props.t('forms.show_password', { ns: 'common' })}
                                        </label>
                                    </div>

                                    <div className="text-sm">
                                        <Link href="/forgot-password">
                                            <a className="font-medium text-primary-600 hover:text-primary-500">
                                                {this.props.t('signin_page.forgot_password', { ns: 'auth' })}?
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 capitalize"
                                    >
                                          {this.props.t('signin_page.submit', { ns: 'auth' })}
                                    </button>
                                </div>
                            </Form>
                        </div>
                    )}
                </Formik>
            </>
        );
    }
}


const FormComponentWithRouter = withRouter(FormComponent);

const FormComponentWithTranslation = withTranslation(['auth', 'common'])(FormComponentWithRouter)


export default FormComponentWithTranslation;