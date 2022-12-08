/* This example requires Tailwind CSS v2.0+ */
import React from "react";
import { Fragment, useRef, useState } from "react";
import Link from "next/link";
import { withRouter } from 'next/router'
import { ResetPasswordSchema } from "../../../../services/schema/auth.schema";
import { withTranslation } from 'next-i18next';
import { Formik, Form, Field, ErrorMessage } from "formik";

class FormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
        };
    }
    render() {
        return (
            <>
                <Formik
                    initialValues={{
                        password: "",
                        confirmPassword: "",
                        token: this.props.token
                    }}
                    validationSchema={ResetPasswordSchema(this.props.t)}
                    onSubmit={(data, { resetForm }) => {
                        this.props.resetPassword(data);
                        resetForm();
                    }}
                >
                    {({ touched, errors, isSubmitting, values }) => (
                        <div className="">
                            <Form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">


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
                                <div className="sm:col-span-2">
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

                                <div className="sm:col-span-2">
                                    <button
                                        type="submit"
                                        className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 capitalize"
                                    >
                                        {this.props.t('reset_password_page.submit', { ns: 'auth' })}
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